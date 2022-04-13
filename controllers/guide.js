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

const GuideModel = require("../modules/guide");

class guideController {
  /**
   * 获取政策法规
   * 枚举值：1国家；2地方；3企业； 4采购案例
   */
  static async getPolicyList(ctx) {
    const current = ctx.query?.current || 1;

    try {
      const data = await GuideModel.getGuideList({ status: current, type:"policy" });
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取政策法规成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }

  /**
   * 获取办事指南
   * 枚举值：1采购人指南；2供应商指南；
   */
  static async getInstructionList(ctx) {
    const current = ctx.query?.current || 1;

    try {
      const data = await GuideModel.getGuideList({ status: current, type:"instruction" });
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取办事指南成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }
  /**
   * 获取下载中心
   * 枚举值：1采购人；2供应商；3综合类；
   */
  static async getDownloadList(ctx) {
    const current = ctx.query?.current || 1;

    try {
      const data = await GuideModel.getGuideList({ status: current, type:"download" });
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取下载中心成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }
  /**
   * 获取党建工作
   * 枚举值：1党建工作；
   */
  static async getPartyList(ctx) {
    const current = ctx.query?.current || 1;

    try {
      const data = await GuideModel.getGuideList({ status: current, type:"party" });
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取党建工作成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }

  // 创建政策法规（临时）
  static async createPolicyList(ctx) {
    try {
      const data = await GuideModel.createPolicyList({});
      ctx.body = new Success(data, "创建政策法规成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }
}

module.exports = guideController;
