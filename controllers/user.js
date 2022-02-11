/**
 * controller 控制器
 * 控制器的主要作用为功能的处理，项目中controller目录下创建article.js，代码如下：
 */
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

    try {
      //创建用户信息模型
      const ret = await UserModel.createUser(req);
      const data = await UserModel.getUserDetail(ret.id);

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
  static async detail(ctx) {
    let id = ctx.params.id;

    if (id) {
      try {
        // 查询用户信息详情模型
        let data = await UserModel.getUserDetail(id);
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
        ctx.body = new Success("登录成功");
      } else {
        ctx.response.status = 503;
        ctx.body = new Forbidden("账号或密码错误");
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = new HttpException();
    }
  }
}

module.exports = userController;
