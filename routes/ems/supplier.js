const router = require("koa-router")();
// 供应商
const SupplierController = require("../../controllers/supplier");
const UploadController = require("../../controllers/upload");

router.prefix("/api/supplier");
/**
 * 用户接口
 */
router.get("/", async (ctx, next) => {
  ctx.body = "suppliersuppliersuppliersuppliersupplier";
});

// 注册用户
router.post("/createSupplier", SupplierController.createSupplier);
// 获取详细信息: query.username|| token
router.get("/getSupplierDetail", SupplierController.getSupplierDetail);
// 修改基本信息：data.username
router.post("/updateSupplierDetail", SupplierController.updateSupplierDetail);
// 获取供应商列表
router.get("/getSupplierList", SupplierController.getSupplierList);
// 删除：批量
router.post("/deleteSuppliers", SupplierController.deleteSuppliers);
// 删除：单条
// 上传头像

module.exports = router;
