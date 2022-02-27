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
// 获取用户详情：根据username
router.get('/detail',UserController.detailByUsername);
// 获取用户详情
router.get('/detail/:id',UserController.detailById)


module.exports = router