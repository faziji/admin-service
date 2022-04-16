/**
 * 获取合同列表
 */
const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");
const FinancialModel = require("../modules/financial");

class financialController {
  // 获取合同列表
  static async getContractList(ctx) {
    const req = ctx.query
    delete req["current"]
    delete req["pageSize"]
    console.log('请求的参数',req);
    try {
      // 传参为合同
      const data = await FinancialModel.getContractList(req);
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取投标列表成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }

  // 创建合同
  static async createContract(ctx) {
    try {
      const data = await FinancialModel.createContract({});
      ctx.body = new Success(data, "创建成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }
}

module.exports = financialController;
