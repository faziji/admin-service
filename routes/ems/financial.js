/**
 * ems管理招投标
 * 1. 投标管理
 * 2. 成交结果
 * 备注:获取项目列表调用getPurchaseAnnouncementList
 */
const router = require("koa-router")();
router.prefix("/api/financial");

router.get("/", async (ctx, next) => {
    ctx.body = `/**
      * ems管理资源
      * 1. 合同管理
      * 2. 发票管理
      */`;
  });


// 更新资源
 const FinancialController = require("../../controllers/financial");

// 获取合同列表
router.get("/getContractList", FinancialController.getContractList);

// 创建发票列表
router.post("/createContract", FinancialController.createContract);

module.exports = router;
