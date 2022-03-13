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

// 引入数据表模型：征询意见
const consultation = Sequelize.import("../schema/consultation");
consultation.sync({ force: false }); //自动创建表

// 引入数据表模型：采购公告
const purchaseAnnouncement = Sequelize.import("../schema/purchaseAnnouncement");
purchaseAnnouncement.sync({ force: false }); //自动创建表

// 引入数据表模型：结果公告
const resultAnnouncement = Sequelize.import("../schema/resultAnnouncement");
resultAnnouncement.sync({ force: false }); //自动创建表

// 引入数据表模型：更正公告
const correctAnnouncement = Sequelize.import("../schema/correctAnnouncement");
correctAnnouncement.sync({ force: false }); //自动创建表

class resourceModel {
  // =================征询意见==========================
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
  static async getConsultationList(data) {
    return await consultation.findAll({
      where: data,
    });
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
    return await consultation.update(data, {
      where: {
        id: data.id,
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
  // =================采购公告=========================
  /**
   * 创建采购公告
   * @param data
   * @returns {Promise<*>}
   */
  static async createPurchaseAnnouncement(data) {
    return await purchaseAnnouncement.create(data);
  }

  /**
   * 获取征询意见列表
   * @returns {Promise<*>}
   */
  static async getPurchaseAnnouncementList(data) {
    return await purchaseAnnouncement.findAll({
      where: data,
    });
  }

  /**
   * 获取采购公告详细信息
   * @returns {Promise<*>}
   */
  static async detailPurchaseAnnouncement(id) {
    return await purchaseAnnouncement.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 删除采购公告
   * @returns {Promise<*>}
   */
  static async deletePurchaseAnnouncement(id) {
    let data = await purchaseAnnouncement.destroy({
      where: {
        id,
      },
    });
    return data;
  }

  /**
   * 更新采购公告详细信息
   * @returns {Promise<*>}
   */
  static async updatePurchaseAnnouncement(data) {
    return await purchaseAnnouncement.update(data, {
      where: {
        id: data.id,
      },
    });
  }

  // =================结果公告=========================
  /**
   * 创建采购公告
   * @param data
   * @returns {Promise<*>}
   */
  static async createResultAnnouncement(data) {
    return await resultAnnouncement.create(data);
  }

  /**
   * 获取结果公告列表
   * @returns {Promise<*>}
   */
  static async getResultAnnouncementList(data) {
    return await resultAnnouncement.findAll({
      where: data,
    });
  }

  /**
   * 删除结果公告
   * @returns {Promise<*>}
   */
  static async deleteResultAnnouncement(id) {
    let data = await resultAnnouncement.destroy({
      where: {
        id,
      },
    });
    return data;
  }

  /**
   * 获取结果公告详细信息
   * @returns {Promise<*>}
   */
  static async detailResultAnnouncement(id) {
    return await resultAnnouncement.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 更新结果公告详细信息
   * @returns {Promise<*>}
   */
  static async updateResultAnnouncement(data) {
    return await resultAnnouncement.update(data, {
      where: {
        id: data.id,
      },
    });
  }

  // =================更正公告=========================
  /**
   * 创建更正公告
   * @param data
   * @returns {Promise<*>}
   */
  static async createCorrectAnnouncement(data) {
    return await correctAnnouncement.create(data);
  }

  /**
   * 获取更正公告列表
   * @returns {Promise<*>}
   */
  static async getCorrectAnnouncementList(data) {
    return await correctAnnouncement.findAll({
      where: data,
    });
  }

  /**
   * 删除更正公告
   * @returns {Promise<*>}
   */
  static async deleteCorrectAnnouncement(id) {
    let data = await correctAnnouncement.destroy({
      where: {
        id,
      },
    });
    return data;
  }

  /**
   * 获取更正公告详细信息
   * @returns {Promise<*>}
   */
  static async detailCorrectAnnouncement(id) {
    return await correctAnnouncement.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 更新更正公告详细信息
   * @returns {Promise<*>}
   */
  static async updateCorrectAnnouncement(data) {
    return await correctAnnouncement.update(data, {
      where: {
        id: data.id,
      },
    });
  }
}

module.exports = resourceModel;
