/**
 * ems管理资源controllers
 * 1. 征询意见
 * 2. 采购公告
 * 3. 结果公告
 * 4. 更正公告
 */
const { isEmptyObject } = require("../utils");

const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

// 资源管理
const ResourceModel = require("../modules/resource");

class resourceController {
  /**
   * 创建征询意见
   * @param ctx
   * @return 创建的征询意见信息
   */
  static async create(ctx) {
    let req = ctx.request.body || {};

    // ！！！！！还有其他的判空，暂时未判断
    if (!req.name) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("意见名称不能为空");
      return;
    }
    // 创建操作
    try {
      const data = await ResourceModel.createConsultation(req);
      ctx.response.status = 200;
      ctx.body = new Success(data, "创建征询意见成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取征询意见列表
   * @param ctx
   * @return 征询意见列表
   */
  static async getConsultationList(ctx) {
    // 获取操作
    try {
      const data = await ResourceModel.getConsultationList();
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取征询意见列表成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取征询意见详细信息
   * @param id
   * @return 征询意见信息
   */
  static async detailConsultation(ctx) {
    let { id } = ctx.query;
    if (!id) throw new ParameterException("id不能为空");

    // 获取操作
    try {
      const data = await ResourceModel.detailConsultation(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取征询意见详细信息成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 更新征询意见详细信息
   * @param id
   * @return 更新后的征询意见信息
   */
  static async updateConsultation(ctx) {
    let req = ctx.request.body;
    if (!req.id) throw new ParameterException("id不能为空");

    // 查看对应的信息是否存在
    try {
      const data = await ResourceModel.detailConsultation(req.id);
      if (!data || isEmptyObject(data)) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("该id信息不存在");
        return;
      }
      // 更新操作
      else {
        try {
          await ResourceModel.updateConsultation(req);
          // 返回更新后的信息
          const data = await ResourceModel.detailConsultation(req.id);
          ctx.response.status = 200;
          ctx.body = new Success(data, "更新征询意见详细信息成功");
        } catch (error) {
          throw new HttpException(err);
        }
      }
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 删除征询意见
   * @param ctx
   * @return 征询意见列表
   */
  static async deleteConsultation(ctx) {
    const { id } = ctx.request.body || {};
    if (!id) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("id不能为空");
      return;
    }
    // 删除操作
    try {
      const data = await ResourceModel.deleteConsultation(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "删除征询意见成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }
}
module.exports = resourceController;
