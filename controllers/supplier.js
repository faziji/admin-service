/**
 * controller 控制器
 * 控制器的主要作用为功能的处理，项目中controller目录下创建article.js，代码如下：
 */

const { isEmptyObject } = require("../utils");
const jwt = require("jsonwebtoken");
// 返回文件地址的时候链接此地址
const { url } = require("./../config/config").qiniu;

const fs = require("fs");
const { secretKey, expiresIn } = require("../config/config").security;
const SupplierModel = require("../modules/supplier");
const { getToken, getDecodeInfo } = require("../utils");
const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

class SupplierController {
  /**
   * 注册供应商信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createSupplier(ctx) {
    //接收客服端
    let req = ctx.request.body || {};
    if (!req.username) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("账号不能为空");
      return;
    }
    if (!req.password) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("密码不能为空");
      return;
    }

    // 账户已存在
    try {
      const res = await SupplierModel.getSupplierDetail({
        username: req.username,
      });
      if (res) {
        ctx.response.status = 400;
        ctx.body = new ParameterException("该账户已存在");
        return;
      }
    } catch (error) {
      throw new HttpException();
    }

    try {
      //创建用户信息模型
      const ret = await SupplierModel.createSupplier(req);

      ctx.response.status = 200;
      ctx.body = new Success(ret, "注册成功");
    } catch (err) {
      throw new HttpException(err);
    }
  }

  /**
   * 获取供应商详情：通过query查询 || 获取本人
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getSupplierDetail(ctx) {
    // 通过query查询
    const queryUsername = ctx.query.username;

    // 通过query查询(测试后门) || 获取本人
    let username = queryUsername || getDecodeInfo(ctx)?.username;

    if (username) {
      try {
        // 查询用户信息详情模型
        let data = await SupplierModel.getSupplierDetail({ username });
        // 删除密码返回
        delete data["dataValues"].password; // 一定要这样删除才可
        data["avatar"] = url + data["avatar"]; // 链接静态资源地址

        ctx.response.status = 200;
        ctx.body = new Success(data);
      } catch (err) {
        ctx.response.status = 400;
        ctx.body = new DatabaseNotFoundException("该用户不存在");
      }
    } else {
      ctx.response.status = 400;
      ctx.body = new ParameterException("缺少用户username");
    }
  }

  /**
   * 修改基本信息：username
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateSupplierDetail(ctx) {
    // ctx.request
    let data = ctx.request.body;
    if (isEmptyObject(data)) {
      ctx.response.status = 400;
      ctx.body = new ParameterException();
      return;
    } else {
      try {
        const username = data.username || getDecodeInfo(ctx)?.username;
        const res = await SupplierModel.updateSupplierDetail(username, data);
        const redData = await SupplierModel.getSupplierDetail({ username });
        ctx.response.status = 200;
        ctx.body = new global.errs.Success(redData);
      } catch (error) {
        ctx.response.status = 500;
        throw new HttpException("更新失败");
      }
    }
  }

  /**
   * 获取列表
   * @param ctx
   * @return 供应商列表
   */
  static async getSupplierList(ctx) {
    try {
      const reqData = ctx.query;
      // 过滤所有空元素
      for (let item in reqData) {
        if (!reqData[item]) {
          delete reqData[item];
        }
      }
      const data = await SupplierModel.getSupplierList(reqData);

      ctx.response.status = 200;
      ctx.body = new Success(
        Array.isArray(data) ? data : [data],
        "获取列表成功"
      );
    } catch (error) {
      throw new HttpException(err);
    }
  }

  /**
   * 批量删除
   * @param ctx
   * @return 新列表
   */
  static async deleteSuppliers(ctx) {
    const { ids } = ctx.request.body || {};

    if (!ids || !ids.length) {
      ctx.response.status = 400;
      ctx.body = new ParameterException("请选择需要删除项");
      return;
    }
    try {
      let data = [];
      for (let i of ids) {
        data.push(await SupplierModel.deleteSupplier(i));
      }
      ctx.response.status = 200;
      ctx.body = new Success(data, "删除成功");
    } catch (error) {
      throw new HttpException(error);
    }
  }
}

module.exports = SupplierController;
