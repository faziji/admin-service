const router = require('koa-router')()
// 学生
const UserController = require('../../controllers/user');
 
router.prefix('/api/fontEnd/user')
/**
 * 测试接口
 */
 router.get('/', async (ctx, next) => {
    ctx.body = 'currecurrentUsercurrentUserntUser1'
  })


// 测试前台
router.get('/currentUser', UserController.currentUser)

module.exports = router