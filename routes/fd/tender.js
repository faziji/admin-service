/**
 * ems管理招投标
 * 1. 投标管理
 * 2. 成交结果
 * 备注:获取项目列表调用getPurchaseAnnouncementList
 */
const router = require("koa-router")();
router.prefix("/api/fontEnd/tender");

// 更新资源
 const TenderController = require("../../controllers/tender");

// 获取投标详情（用于判断是否已投标）
router.get("/getTenderList", TenderController.getTenderList);

// 投标报名
router.post("/createTender", TenderController.createTender);

// 结算获取成交结果
router.post("/createResult", TenderController.createResult);
// 获取成交结果
router.get("/getResultList", TenderController.getResultList);


module.exports = router;
