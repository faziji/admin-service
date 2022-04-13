const router = require('koa-router')()
const GuideController = require('../../controllers/guide');
 
router.prefix('/api/fontEnd/guide')
/**
 * 测试接口
 */
 router.get('/', async (ctx, next) => {
    ctx.body = 'user'
  })


// 登录
// router.post('/login', UserController.fdLogin)

// 获取用户信息
router.get('/getPolicyList', GuideController.getPolicyList)
router.get('/getInstructionList', GuideController.getInstructionList)
router.get('/getDownloadList', GuideController.getDownloadList)
router.get('/getPartyList', GuideController.getPartyList)
router.get('/createPolicyList', GuideController.createPolicyList)

module.exports = router