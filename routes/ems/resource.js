/**
 * ems管理资源
 * 1. 征询意见
 * 2. 采购公告
 * 3. 结果公告
 * 4. 更正公告
 */

const router = require("koa-router")();

const ResourceController = require("../../controllers/resource");

router.prefix("/api/resource");

router.get("/", async (ctx, next) => {
  ctx.body = `/**
    * ems管理资源
    * 1. 征询意见
    * 2. 采购公告
    * 3. 结果公告
    * 4. 更正公告
    */`;
});

/**
 * 征询意见相关
 */
// 创建征询意见
router.post("/create", ResourceController.create);
// 获取征询意见列表
router.get("/getConsultationList", ResourceController.getConsultationList);
// 删除征询意见
router.post("/deleteConsultation", ResourceController.deleteConsultation);
// 获取征询意见详细信息
router.get("/detailConsultation", ResourceController.detailConsultation);
// 更新征询意见详细信息
router.post("/updateConsultation", ResourceController.updateConsultation);

module.exports = router;
