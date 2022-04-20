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
  // ====================征询意见================================
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

    // 根据发布类型更新status状态
    let reqData = {
      ...req,
      status: req.statusType === "新建暂不发布" ? 0 : 1,
    };

    // 创建操作
    try {
      const data = await ResourceModel.createConsultation(reqData);
      ctx.response.status = 200;
      ctx.body = new Success(data, "创建征询意见成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取征询意见列表(后台管理)
   * @param ctx
   * @return 征询意见列表
   */
  static async getConsultationList(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getConsultationList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取征询意见列表成功"
      );
    } catch (err) {
      throw new HttpException(err);
    }
  }
  /**
   * 获取征询意见列表（前台）
   * @param ctx
   * @return 征询意见列表
   */
  static async getConsultationListFontEnd(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getConsultationList({...reqData, status: 1});

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取征询意见列表成功"
      );
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

  /**
   * 批量删除征询意见
   * @param ctx
   * @return 征询意见列表
   */
  static async deleteConsultations(ctx) {
    const { ids } = ctx.request.body || {};

    if (!ids || !ids.length) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("请选择需要删除项");
      return;
    }
    try {
      let data = [];
      for (let i of ids) {
        data.push(await ResourceModel.deleteConsultation(i));
      }
      ctx.response.status = 200;
      ctx.body = new Success(data, "批量删除征询意见成功");
    } catch (error) {
      throw new HttpException(err);
    }
  }
  // ====================采购公告================================
  /**
   * 创建采购公告
   * @param ctx
   * @return 创建采购公告
   */
  static async createPurchaseAnnouncement(ctx) {
    let req = ctx.request.body || {};

    // ！！！！！还有其他的判空，暂时未判断
    if (!req.name) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("采购公告名称不能为空");
      return;
    }

    // 根据发布类型更新status状态
    let reqData = {
      ...req,
      status: req.statusType === "新建暂不发布" ? 0 : 1,
    };

    // 创建操作
    try {
      const data = await ResourceModel.createPurchaseAnnouncement(reqData);
      ctx.response.status = 200;
      ctx.body = new Success(data, "采购公告创建成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取采购公告列表
   * @param ctx
   * @return 采购公告列表
   */
  static async getPurchaseAnnouncementList(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getPurchaseAnnouncementList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取征询意见列表成功"
      );
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取采购公告详细信息
   * @param id
   * @return 采购公告详细信息
   */
  static async detailPurchaseAnnouncement(ctx) {
    let { id } = ctx.query;
    if (!id) throw new ParameterException("id不能为空");

    // 获取操作
    try {
      const data = await ResourceModel.detailPurchaseAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取采购公告详细信息成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 删除采购公告
   * @param ctx
   * @return 采购公告
   */
  static async deletePurchaseAnnouncement(ctx) {
    const { id } = ctx.request.body || {};
    if (!id) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("id不能为空");
      return;
    }
    // 删除操作
    try {
      const data = await ResourceModel.deletePurchaseAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "删除采购公告成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 批量删除采购公告
   * @param ctx
   * @return 采购公告列表
   */
  static async deletePurchaseAnnouncements(ctx) {
    const { ids } = ctx.request.body || {};

    if (!ids || !ids.length) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("请选择需要删除项");
      return;
    }
    try {
      let data = [];
      for (let i of ids) {
        data.push(await ResourceModel.deletePurchaseAnnouncement(i));
      }
      ctx.response.status = 200;
      ctx.body = new Success(data, "批量删除采购公告成功");
    } catch (error) {
      throw new HttpException(err);
    }
  }

  /**
   * 更新采购公告详细信息
   * @param id
   * @return 更新后的采购公告信息
   */
  static async updatePurchaseAnnouncement(ctx) {
    let req = ctx.request.body;
    if (!req.id) throw new ParameterException("id不能为空");

    // 查看对应的信息是否存在
    try {
      const data = await ResourceModel.detailPurchaseAnnouncement(req.id);
      if (!data || isEmptyObject(data)) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("该id信息不存在");
        return;
      }
      // 更新操作
      else {
        try {
          await ResourceModel.updatePurchaseAnnouncement(req);
          // 返回更新后的信息
          const data = await ResourceModel.detailPurchaseAnnouncement(req.id);
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

  // ====================结果公告================================
  /**
   * 创建结果公告
   * @param ctx
   * @return 创建结果公告详细信息
   */
  static async createResultAnnouncement(ctx) {
    let req = ctx.request.body || {};

    // ！！！！！还有其他的判空，暂时未判断
    if (!req.name) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("结果公告名称不能为空");
      return;
    }

    // 根据发布类型更新status状态
    let reqData = {
      ...req,
      status: req.statusType === "新建暂不发布" ? 0 : 1,
    };

    // 创建操作
    try {
      const data = await ResourceModel.createResultAnnouncement(reqData);
      ctx.response.status = 200;
      ctx.body = new Success(data, "结果公告创建成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取结果公告列表
   * @param ctx
   * @return 结果公告列表
   */
  static async getResultAnnouncementList(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getResultAnnouncementList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取征询意见列表成功"
      );
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 删除结果公告
   * @param ctx
   * @return 采购公告
   */
  static async deleteResultAnnouncement(ctx) {
    const { id } = ctx.request.body || {};
    if (!id) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("id不能为空");
      return;
    }
    // 删除操作
    try {
      const data = await ResourceModel.deleteResultAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "删除结果公告成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 批量删除结果公告
   * @param ctx
   * @return 结果公告列表
   */
  static async deleteResultAnnouncements(ctx) {
    const { ids } = ctx.request.body || {};

    if (!ids || !ids.length) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("请选择需要删除项");
      return;
    }
    try {
      let data = [];
      for (let i of ids) {
        data.push(await ResourceModel.deleteResultAnnouncement(i));
      }
      ctx.response.status = 200;
      ctx.body = new Success(data, "批量删除结果公告成功");
    } catch (error) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取结果公告详细信息
   * @param id
   * @return 采购公告详细信息
   */
  static async detailResultAnnouncement(ctx) {
    let { id } = ctx.query;
    if (!id) throw new ParameterException("id不能为空");
    console.log("11111111111111");

    // 获取操作
    try {
      const data = await ResourceModel.detailResultAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取结果公告详细信息成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 更新采购公告详细信息
   * @param id
   * @return 更新后的采购公告信息
   */
  static async updateResultAnnouncement(ctx) {
    let req = ctx.request.body;
    if (!req.id) throw new ParameterException("id不能为空");

    // 查看对应的信息是否存在
    try {
      const data = await ResourceModel.detailResultAnnouncement(req.id);
      if (!data || isEmptyObject(data)) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("该id信息不存在");
        return;
      }
      // 更新操作
      else {
        try {
          console.log("111111111111");
          await ResourceModel.updateResultAnnouncement(req);
          console.log("22222222222");
          // 返回更新后的信息
          const data = await ResourceModel.detailResultAnnouncement(req.id);
          console.log("333333");
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

  // ====================更正公告================================
  /**
   * 创建更正公告
   * @param ctx
   * @return 创建更正公告详细信息
   */
  static async createCorrectAnnouncement(ctx) {
    let req = ctx.request.body || {};

    // ！！！！！还有其他的判空，暂时未判断
    if (!req.name) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("更正公告名称不能为空");
      return;
    }

    // 根据发布类型更新status状态
    let reqData = {
      ...req,
      status: req.statusType === "新建暂不发布" ? 0 : 1,
    };

    // 创建操作
    try {
      const data = await ResourceModel.createCorrectAnnouncement(reqData);
      ctx.response.status = 200;
      ctx.body = new Success(data, "更正公告创建成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取更正公告列表
   * @param ctx
   * @return 更正公告列表
   */
  static async getCorrectAnnouncementList(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getCorrectAnnouncementList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取更正公告列表成功"
      );
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 删除结果公告
   * @param ctx
   * @return 结果公告
   */
  static async deleteCorrectAnnouncement(ctx) {
    const { id } = ctx.request.body || {};
    if (!id) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("id不能为空");
      return;
    }
    // 删除操作
    try {
      const data = await ResourceModel.deleteCorrectAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "删除成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 批量删除更正公告
   * @param ctx
   * @return 更正公告列表
   */
  static async deleteCorrectAnnouncements(ctx) {
    const { ids } = ctx.request.body || {};

    if (!ids || !ids.length) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("请选择需要删除项");
      return;
    }
    try {
      let data = [];
      for (let i of ids) {
        data.push(await ResourceModel.deleteCorrectAnnouncement(i));
      }
      ctx.response.status = 200;
      ctx.body = new Success(data, "批量删除公告成功");
    } catch (error) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取更正公告详细信息
   * @param id
   * @return 采购更正详细信息
   */
  static async detailCorrectAnnouncement(ctx) {
    let { id } = ctx.query;
    if (!id) throw new ParameterException("id不能为空");

    // 获取操作
    try {
      const data = await ResourceModel.detailCorrectAnnouncement(id);
      ctx.response.status = 200;
      ctx.body = new Success(data, "获取详细信息成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 更新采购公告详细信息
   * @param id
   * @return 更新后的采购公告信息
   */
  static async updateCorrectAnnouncement(ctx) {
    let req = ctx.request.body;
    if (!req.id) throw new ParameterException("id不能为空");

    // 查看对应的信息是否存在
    try {
      const data = await ResourceModel.detailCorrectAnnouncement(req.id);
      if (!data || isEmptyObject(data)) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("该id信息不存在");
        return;
      }
      // 更新操作
      else {
        try {
          console.log("111111111111");
          await ResourceModel.updateCorrectAnnouncement(req);
          console.log("22222222222");
          // 返回更新后的信息
          const data = await ResourceModel.detailCorrectAnnouncement(req.id);
          console.log("333333");
          ctx.response.status = 200;
          ctx.body = new Success(data, "更新详细信息成功");
        } catch (error) {
          throw new HttpException(err);
        }
      }
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取关注公告列表
   * @param ctx
   * @return 关注公告列表
   */
  static async getAttentionList(ctx) {
    // 获取操作
    try {
      // 请求参数
      const reqData = ctx.query;
      delete reqData["current"];
      delete reqData["pageSize"];

      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await ResourceModel.getAttentionList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取关注列表成功"
      );
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 关注公告
   * @param ctx
   * @return 关注公告
   */
  static async createAttention(ctx) {
    let req = ctx.request.body || {};
    // 创建操作
    try {
      const data = await ResourceModel.createAttention(req);
      ctx.response.status = 200;
      ctx.body = new Success(data, "关注成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 取消关注
   * @param ctx
   * @return 更正公告列表
   */
  static async deleteAttention(ctx) {
    let req = ctx.request.body || {};
    console.log('11111111111111111', req);

    try {
      await ResourceModel.deleteAttention(req);
      ctx.response.status = 200;
      ctx.body = new Success("取消关注成功！");
    } catch (error) {
      throw new HttpException(error);
    }
  }

  // deleteAttention

  // createAttention
}
module.exports = resourceController;
