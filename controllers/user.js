/**
 * controller 控制器
 * 控制器的主要作用为功能的处理，项目中controller目录下创建article.js，代码如下：
 */

const { isEmptyObject } = require("../utils");
const jwt = require("jsonwebtoken");
// 返回文件地址的时候链接此地址
const { url } = require("./../config/config").qiniu;

const fs = require("fs");
const { secretKey, expiresIn } = require("../config/config").security;
const UserModel = require("../modules/user");
const { getToken, getDecodeInfo } = require("../utils");
const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

class userController {
  /**
   * 注册用户信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    //接收客服端
    let req = ctx.request.body || {};
    if (!req.username) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("账号不能为空");
      return;
    }
    if (!req.password) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("密码不能为空");
      return;
    }

    // 账户已存在
    try {
      const res = await UserModel.getUserDetailByUsername(req.username);
      // 返回空 => 数据
      if (res) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("账户已存在");
        return;
      }
    } catch (error) {
      throw new HttpException();
    }

    try {
      //创建用户信息模型
      const ret = await UserModel.createUser(req);
      const data = await UserModel.getUserDetailById(ret.id);

      ctx.response.status = 200;
      ctx.body = new Success(data, "注册用户成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取用户详情：根据用户id查询
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detailById(ctx) {
    // 根据用户id查询
    const id = ctx.params.id;

    if (id) {
      try {
        // 查询用户信息详情模型
        const data = await UserModel.getUserDetailById(id);
        data["avatar"] = url + data["avatar"]; // 链接静态资源地址

        ctx.body = new Success(data);
        ctx.response.status = 200;
      } catch (err) {
        throw new HttpException();
      }
    } else {
      ctx.response.status = 400;
      ctx.body = new ParameterException("缺少用户id");
    }
  }

  /**
   * 获取用户详情：服务器查询ctx仅表示一个值 || 通过query查询 || 获取本人
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detailByUsername(ctx) {
    // 通过query查询
    const queryUsername = ctx.query?.username;
    //  通过query查询(测试后门) || 获取本人
    let username = queryUsername || getDecodeInfo(ctx)?.username;

    if (username) {
      try {
        // 查询用户信息详情模型
        let data = await UserModel.getUserDetailByUsername(username);
        // 删除密码返回
        delete data["dataValues"].password; // 一定要这样删除才可
        data["avatar"] = url + data["avatar"]; // 链接静态资源地址

        ctx.response.status = 200;
        ctx.body = new Success(data);
      } catch (err) {
        throw new HttpException();
      }
    } else {
      ctx.response.status = 400;
      ctx.body = new ParameterException("缺少用户username");
    }
  }

  /**
   * 修改用户基本信息：username
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async baseSettings(ctx) {
    // ctx.request
    let data = ctx.request.body;
    if (isEmptyObject(data)) {
      ctx.response.status = 400;
      ctx.body = new ParameterException();
      return;
    } else {
      try {
        let res = await UserModel.updateUserDetail(
          getDecodeInfo(ctx)?.username,
          data
        );
        ctx.response.status = 200;
        ctx.body = new global.errs.Success(res);
      } catch (error) {
        ctx.response.status = 500;
        throw new HttpException("更新失败");
      }
    }
  }

  /**
   * 文件上传：存在到服务器，/public文件夹下
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async uploadFile(ctx) {
    console.log("上传文件", ctx.request.files.file);
    const { name, path: filePath, size, type } = ctx.request.files.file;

    // 上传文件为空
    if (!ctx.request.files.file) throw new ParameterException("上传文件为空");

    /**
     * 以下是读取文件和写入文件的代码
     */
    // 创建可读流
    const reader = fs.createReadStream(filePath);
    // 读取的__dirname包含\controllers需要去除掉
    let targetPath = `${__dirname.replace(
      "controllers",
      ""
    )}\\public\\upload\\${name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    // 通过token获取username // 待优化
    let { username } = ctx.request.body;

    // 更新数据中的相对地址 /upload/${name}
    try {
      let avatar = `http://localhost:3000/upload/${name}`;
      await UserModel.updateUserDetail(username, { avatar });
      ctx.response.status = 200;
      ctx.body = new Success(
        {
          name, // 文件名称
          filePath, // 临时路径
          targetPath, // 服务器存储地址
          size, // 文件大小
          type, // 文件类型
          avatar, // 服务器资源的相对地址
        },
        "上传成功！"
      );
    } catch (error) {
      throw new HttpException("更新失败");
    }
  }

  /**
   * 用户登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login(ctx) {
    let { username, password } = ctx.request.body;
    if (!username) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("账号不能为空");
      return;
    }
    if (!password) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("密码不能为空");
      return;
    }

    try {
      // 查询用户信息详情模型
      let res = await UserModel.checkUserLogin(username, password);
      if (!!res) {
        ctx.response.status = 200;
        // 生成token
        let data = {
          token: jwt.sign({ username }, secretKey, {
            expiresIn,
          }),
        };
        ctx.body = new Success(data, "登录成功");
      } else {
        ctx.body = new Forbidden("账号或密码错误");
      }
    } catch (err) {
      throw new HttpException();
    }
  }

  /**
   * 前台中心：验证身份
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async currentUser(ctx) {
    let token = getToken(ctx);
    if (!token) {
      ctx.response.status = 200;
      ctx.body = new Success("noLoginUser");
    } else {
      ctx.response.status = 400;
      ctx.body = new ParameterException("需要验证账号");
      console.log("需要验证账号");
    }
  }
}

module.exports = userController;
