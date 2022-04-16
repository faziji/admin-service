// 引入mysql的配置文件
const db = require("../core/db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
// 合同
const contract = Sequelize.import("../schema/contract");
contract.sync({ force: false }); // 自动创建表

// 发票
const invoice = Sequelize.import("../schema/invoice");
invoice.sync({ force: false }); // 自动创建表

class FinancialModel {
  /**
   * 创建合同
   * @param data
   * @returns {Promise<*>}
   */
  static async createContract(data) {
    return await contract.create(data);
  }

  /**
   * 获取合同列表
   * @param data
   * @returns {Promise<*>}
   */
  static async getContractList(data) {
    return await contract.findAll({
      where: data,
    });
  }

  /**
   * 创建发票
   * @param data
   * @returns {Promise<*>}
   */
  static async createInvoice(data) {
    return await invoice.create(data);
  }
   /**
   * 获取发票列表
   * @param data
   * @returns {Promise<*>}
   */
    static async getInvoiceList(data) {
      return await invoice.findAll({
        where: data,
      });
    }

  // getInvoiceList
}
module.exports = FinancialModel;
