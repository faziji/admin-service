const router = require('koa-router')()
// 学生
const UserController = require('../../controllers/user');
 
router.prefix('/api/fontEnd/user')
/**
 * 测试接口
 */
 router.get('/', async (ctx, next) => {
    ctx.body = 'user'
  })


// 登录
router.post('/login', UserController.fdLogin)

// 获取用户信息
router.get('/currentUser', UserController.currentUser)

module.exports = router