const router = require('koa-router')()
// 学生
const StudentController = require('../controllers/student');
 
router.prefix('/student')
/**
 * 学生接口
 */
 router.get('/', async (ctx, next) => {
    // ctx.body = await userService.findUserData();
    ctx.body = 'studentstudentstudentstudent'
  })


//创建学生
router.post('/student/create',StudentController.create);
//获取学生详情
router.get('/student/:id',StudentController.detail)
 
module.exports = router