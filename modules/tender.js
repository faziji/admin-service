// 引入mysql的配置文件
const db = require("../core/db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const tender = Sequelize.import("../schema/tender");
tender.sync({ force: true }); // 自动创建表

class TenderModel {
  /**
   * 投标
   * @param data
   * @returns {Promise<*>}
   */
  static async createTender(data) {
    return await tender.create(data);
  }

   /**
   * 获取项目投标记录
   * @param data
   * @returns {Promise<*>}
   */
    static async getTenderList(data) {
      return await tender.findAll({
        where: data,
      });
    }
}
module.exports = TenderModel;
