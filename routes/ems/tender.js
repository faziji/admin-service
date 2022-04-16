/**
 * ems管理招投标
 * 1. 投标管理
 * 2. 成交结果
 * 备注:获取项目列表调用getPurchaseAnnouncementList
 */
const router = require("koa-router")();
router.prefix("/api/tender");

router.get("/", async (ctx, next) => {
    ctx.body = `/**
      * ems管理资源
      * 1. 投标管理
      * 2. 成交结果
      */`;
  });


// 更新资源
 const TenderController = require("../../controllers/tender");

// 获取投标详情
router.get("/getTenderList", TenderController.getTenderList);

// 投标报名
router.post("/createTender", TenderController.createTender);

// 结算获取成交结果
router.post("/createResult", TenderController.createResult);
// 获取成交结果
router.get("/getResultList", TenderController.getResultList);


module.exports = router;
