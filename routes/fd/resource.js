/**
 * ems管理资源
 * 1. 征询意见
 * 2. 采购公告
 * 3. 结果公告
 * 4. 更正公告
 */

const router = require("koa-router")();
// 更新资源
const ResourceController = require("../../controllers/resource");
// 上传文件
const UploadController = require("../../controllers/upload");

router.prefix("/api/fontEnd/resource");

router.get("/", async (ctx, next) => {
  ctx.body = `/**
     * fd资源
     * 1. 征询意见
     * 2. 采购公告
     * 3. 结果公告
     * 4. 更正公告
     */`;
});

/**
 * 公告路由
 */
// 上传资源
router.post("/uploadResource", UploadController.uploadResource);

/**
 * 征询意见相关
 */
// 创建征询意见
router.post("/createtConsultation", ResourceController.create);
// 获取征询意见列表
router.get("/getConsultationList", ResourceController.getConsultationList);
// 删除征询意见:单条删除
router.post("/deleteConsultation", ResourceController.deleteConsultation);
// 删除征询意见:批量删除
router.post("/deleteConsultations", ResourceController.deleteConsultations);
// 获取征询意见详细信息
router.get("/detailConsultation", ResourceController.detailConsultation);
// 更新征询意见详细信息
router.post("/updateConsultation", ResourceController.updateConsultation);
// 上传资源
router.post("/uploadResource", UploadController.uploadResource);

/**
 * 采购公告相关
 */
// 创建：节点
router.post(
  "/createPurchaseAnnouncement",
  ResourceController.createPurchaseAnnouncement
);
// 获取：列表
router.get(
  "/getPurchaseAnnouncementList",
  ResourceController.getPurchaseAnnouncementList
);
// 删除:单条
router.post(
  "/deletePurchaseAnnouncement",
  ResourceController.deletePurchaseAnnouncement
);
// 删除:批量
router.post(
  "/deletePurchaseAnnouncements",
  ResourceController.deletePurchaseAnnouncements
);
// 获取：详细信息
router.get(
  "/detailPurchaseAnnouncement",
  ResourceController.detailPurchaseAnnouncement
);
// 更新：详细信息
router.post(
  "/updatePurchaseAnnouncement",
  ResourceController.updatePurchaseAnnouncement
);

/**
 * 结果公告相关
 */
// 创建：节点
router.post(
  "/createResultAnnouncement",
  ResourceController.createResultAnnouncement
);
// 获取：列表
router.get(
  "/getResultAnnouncementList",
  ResourceController.getResultAnnouncementList
);
// 删除:单条
router.post(
  "/deleteResultAnnouncement",
  ResourceController.deleteResultAnnouncement
);
// 删除:批量
router.post(
  "/deleteResultAnnouncements",
  ResourceController.deleteResultAnnouncements
);
// 获取：详细信息
router.get(
  "/detailResultAnnouncement",
  ResourceController.detailResultAnnouncement
);
// 更新：详细信息
router.post(
  "/updateResultAnnouncement",
  ResourceController.updateResultAnnouncement
);

/**
 * 更正公告相关
 */
// 创建：节点
router.post(
  "/createCorrectAnnouncement",
  ResourceController.createCorrectAnnouncement
);
// 获取：列表
router.get(
  "/getCorrectAnnouncementList",
  ResourceController.getCorrectAnnouncementList
);
// 删除:单条
router.post(
  "/deleteCorrectAnnouncement",
  ResourceController.deleteCorrectAnnouncement
);
// 删除:批量
router.post(
  "/deleteCorrectAnnouncements",
  ResourceController.deleteCorrectAnnouncements
);
// 获取：详细信息
router.get(
  "/detailCorrectAnnouncement",
  ResourceController.detailCorrectAnnouncement
);
// 更新：详细信息
router.post(
  "/updateCorrectAnnouncement",
  ResourceController.updateCorrectAnnouncement
);

/**
 * 关注公告
 */
// 获取关注公告
router.get("/getAttentionList", ResourceController.getAttentionList);
// 创建关注公告
router.post("/createAttention", ResourceController.createAttention);
// 取消关注
// deleteAttention
router.post("/deleteAttention", ResourceController.deleteAttention);


module.exports = router;
