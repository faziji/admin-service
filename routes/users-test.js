// const router = require('koa-router')()

// router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// module.exports = router

// 上面的代码是koa2中自带的代码


// 以下用于测试mysql报提供的mysql查询接口
const router = require('koa-router')()
const userService = require('../controllers/configMysql,js');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  ctx.body = await userService.findUserData();
//   ctx.body = 'this is a users/bar response123'
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
  let arr = [];

//   arr.push(ctx.request.body['name']);
//   arr.push(ctx.request.body['pass']);
//   arr.push(ctx.request.body['auth']);

//   await userService.addUserData(arr)
//       .then((data) => {
//           let r = '';
//           if (data.affectedRows != 0) {
//               r = 'ok';
//           }
//           ctx.body = {
//               data: r
//           }
//       }).catch(() => {
//           ctx.body = {
//               data: 'err'
//           }
//       })
})

module.exports = router