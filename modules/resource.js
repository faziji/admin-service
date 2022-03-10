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
const consultation = Sequelize.import("../schema/consultation");
consultation.sync({ force: false }); //自动创建表

class resourceModel {
  /**
   * 创建征询意见
   * @param data
   * @returns {Promise<*>}
   */
  static async createConsultation(data) {
    return await consultation.create(data);
  }

  /**
   * 获取征询意见列表
   * @returns {Promise<*>}
   */
  static async getConsultationList() {
    return await consultation.findAll();
  }

  /**
   * 获取征询意见详细信息
   * @returns {Promise<*>}
   */
  static async detailConsultation(id) {
    return await consultation.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 更新征询意见详细信息
   * @returns {Promise<*>}
   */
  static async updateConsultation(data) {
    return await consultation.update(data,{
      where: {
        id:data.id,
      },
    });
  }

  /**
   * 删除征询意见
   * @returns {Promise<*>}
   */
  static async deleteConsultation(id) {
    let data = await consultation.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}

module.exports = resourceModel;
