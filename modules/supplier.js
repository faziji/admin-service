/**
 * 模型应用、使用
 * 在项目中modules目录下创建supplier.js文件
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
const supplier = Sequelize.import("../schema/supplier");
supplier.sync({ force: false }); // 自动创建表

class SupplierModel {
  /**
   * 创建模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createSupplier(data) {
    return await supplier.create(data);
  }
  /**
   * 查询供应商信息的详情
   * @param id 账号
   * @returns {Promise<Model>}
   */
  static async getSupplierDetail(data) {
    console.log('222222222222222', data);
    return await supplier.findOne({
      where: data,
    });
  }

  /**
   * 修改用户信息的详情
   * @param username 账号
   * @returns {Promise<Model>}
   */
  static async updateSupplierDetail(username, data) {
    if (!username) throw new ParameterException("该用户不存在");
    await supplier.update(data, { where: { username } });
  }

  /**
   * 获取供应商列表
   * @returns {Promise<*>}
   */
  static async getSupplierList(data) {
    return await supplier.findAll({
      where: data,
    });
  }

  /**
   * 删除供应商列表
   * @returns {Promise<*>}
   */
  static async deleteSupplier(id) {
    return await supplier.destroy({
      where: {
        id,
      },
    });
  }

    /**
   * 用户登录
   * @param username 账号；password 密码
   * @returns {Promise<Model>}
   */
     static async checkSupplierLogin(username, password) {
      return await supplier.findOne({
        where: {
          username,
          password,
        },
      });
    }

}



module.exports = SupplierModel;
