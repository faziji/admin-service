/**
 * 模型应用、使用
 * 在项目中modules目录下创建student.js文件，为学生信息表，该文件为文章的实例。
 */

const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

// 引入mysql的配置文件
const db = require("../core/db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const user = Sequelize.import("../schema/user");
user.sync({ force: false }); //自动创建表

class userModel {
  /**
   * 创建用户模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createUser(data) {
    return await user.create(data);
  }

  /**
   * 查询用户信息的详情
   * @param id 账号
   * @returns {Promise<Model>}
   */
  static async getUserDetailById(id) {
    return await user.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 查询用户信息的详情
   * @param username 账号
   * @returns {Promise<Model>}
   */
  static async getUserDetailByUsername(username) {
    return await user.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * 修改用户信息的详情
   * @param username 账号
   * @returns {Promise<Model>}
   */
  static async updateUserDetail(username, data) {
    if (!username) throw new ParameterException("该用户不存在");
    await user.update(data, { where: { username } });
  }

  /**
   * 查询用户账号是否存在
   * @param username 账号
   * @returns {Promise<Model>}
   */
  static async isUsernameExited(username) {
    return await user.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * 用户登录
   * @param username 账号；password 密码
   * @returns {Promise<Model>}
   */
  static async checkUserLogin(username, password) {
    return await user.findOne({
      where: {
        username,
        password,
      },
    });
  }
}

module.exports = userModel;
