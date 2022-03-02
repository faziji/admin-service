const router = require('koa-router')()
// 学生
const UserController = require('../controllers/user');
 
router.prefix('/api/user')
/**
 * 用户接口
 */
 router.get('/', async (ctx, next) => {
    ctx.body = 'currecurrentUsercurrentUserntUser1'
  })

// 注册用户
router.post('/create',UserController.create);
// 用户登录
router.post('/login',UserController.login);
// 设置用户基本信息
router.post('/baseSettings',UserController.baseSettings);
// 直接获取用户信息
router.get('/detail',UserController.detailByUsername);
// 获取用户详情
router.get('/detail/:id',UserController.detailById)
// 上传图片
router.post('/uploadFile', UserController.uploadFile)

module.exports = router