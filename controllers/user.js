/**
 * controller 控制器
 * 控制器的主要作用为功能的处理，项目中controller目录下创建article.js，代码如下：
 */

const {isEmptyObject} = require("../utils");
const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../config/config").security;
const UserModel = require("../modules/user");
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
    let req = ctx.request.body;
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
      ctx.response.status = 500;
      ctx.body = new HttpException();
    }

    try {
      //创建用户信息模型
      const ret = await UserModel.createUser(req);
      const data = await UserModel.getUserDetailById(ret.id);

      ctx.response.status = 200;
      ctx.body = new Success(data, "注册用户成功");
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = new HttpException();
    }
  }

  /**
   * 获取用户详情：根据用户id查询
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detailById(ctx) {
    // 根据用户id查询
    let id = ctx.params.id;

    if (id) {
      try {
        // 查询用户信息详情模型
        let data = await UserModel.getUserDetailById(id);
        ctx.response.status = 200;
        ctx.body = new Success(data);
      } catch (err) {
        ctx.response.status = 500;
        ctx.body = new HttpException();
      }
    } else {
      ctx.response.status = 400;
      ctx.body = new ParameterException("缺少用户id");
    }
  }

  /**
   * 获取用户详情：根据用户传参username查询
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detailByUsername(ctx) {
    let token = ctx.request.headers["authorization"];
    let decode = jwt.verify(token, "abcd");
    let username = decode?.username

    if (username) {
      try {
        // 查询用户信息详情模型
        let data = await UserModel.getUserDetailByUsername(username);
        // 删除密码返回
        delete data["dataValues"].password; // 一定要这样删除才可

        ctx.response.status = 200;
        ctx.body = new Success(data);
      } catch (err) {
        ctx.response.status = 500;
        ctx.body = new HttpException();
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
    let token = ctx.request.headers["authorization"];
    let decode = jwt.verify(token, "abcd");
    let username = decode?.username

    // ctx.request
    let data = ctx.request.body
    if(isEmptyObject(data)){
      ctx.response.status = 400;
      throw new ParameterException()
    }else{
      try {
        let res = await UserModel.updateUserDetail(username, data);
        ctx.response.status = 200;
        ctx.body = new Success(res)
      } catch (error) {
        ctx.response.status = 500;
        throw new HttpException("更新失败")
      }
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
          token:jwt.sign({ username }, secretKey, {
            expiresIn
          }),
        };
        ctx.body = new Success(data, "登录成功");
      } else {
        ctx.body = new Forbidden("账号或密码错误");
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = new HttpException();
    }
  }
}

module.exports = userController;
