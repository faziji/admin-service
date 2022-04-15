/**
 * 获取前台相关指南列表
 */

const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

const TenderModel = require("../modules/tender");

class tenderController {
  // 根据采购公告id获取投标记录
  static async getTenderList(ctx) {
    const announcementId = ctx.query?.announcementId;
    try {
      // 传参为结果公告id
      const data = await TenderModel.getTenderList({
        announcementId,
      });

      ctx.response.status = 200;
      ctx.body = new Success(data, "获取投标列表成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }

  // 投标（报名）
  static async createTender(ctx) {
    try {
      const data = await TenderModel.createTender({});
      ctx.body = new Success(data, "投标成功");
    } catch (error) {
      throw new HttpException(error);
    }
    // ctx.body = new Success({}, "创建成功");
    // ctx.response.status = 200;
  }
}

module.exports = tenderController;
