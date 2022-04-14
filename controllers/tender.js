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
  static async getPolicyList(ctx) {
    const current = ctx.query?.current || 1;

    try {
      const data = await GuideModel.getGuideList({
        status: current,
        type: "policy",
      });
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取政策法规成功");
    } catch (error) {
      throw new HttpException(error);
    }

    ctx.body = new Success({}, "获取成功");
    ctx.response.status = 200;
  }

  // 创建招投标（临时）
  static async createTender(ctx) {
    try {
      const data = await TenderModel.createTender({});
      ctx.body = new Success(data, "创建政策法规成功");
    } catch (error) {
      throw new HttpException(error);
    }
    // ctx.body = new Success({}, "创建成功");
    // ctx.response.status = 200;
  }
}

module.exports = tenderController;
