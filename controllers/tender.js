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
    /**
     * 获取政策法规
     * 枚举值：1国家；2地方；3企业； 4采购案例
     */
    // static async getPolicyList(ctx) {
    //   const current = ctx.query?.current || 1;
  
    //   try {
    //     const data = await GuideModel.getGuideList({ status: current, type:"policy" });
    //     ctx.response.status = 200;
    //     ctx.body = new Success(data, "获取政策法规成功");
    //   } catch (error) {
    //     throw new HttpException(error);
    //   }
    // }
  

    // 创建政策法规（临时）
    static async createTender(ctx) {
    //   try {
    //     // const data = await TenderModel.createTender({});
    //     // ctx.body = new Success(data, "创建政策法规成功");
    // } catch (error) {
    //     throw new HttpException(error);
    // }
    console.log('222222222222222222');
    ctx.body = new Success({}, "创建成功");
    ctx.response.status = 200;
    }


  }
  
  module.exports = tenderController;
  