const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koaBody = require("koa-body");

const token = require("./modules/jsonwebtoken");

// error handler
onerror(app);

/**
 * 用于文件上传
 * 接收post参数解析，写在路由和bodyparser的前面
 */
app.use(
  koaBody({
    multipart: true,
  })
);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

/**
 * token相关
 */
app.use(token);

/**
 * zhu：解决跨域问题
 */
const cors = require("koa-cors");
app.use(cors()); //使用cors

/**
 * zhu：添加路由接口
 * ！！！注意：使用的路由接口具有post请求需要放在bodyparser后面，否则无法req.body将为undefined！！！
 */
// 添加学生接口请求
// const student = require('./routes/ems/student')
// app.use(student.routes(), student.allowedMethods())

/**
 * 注册路由
 */
const emsUser = require("./routes/ems/user");
app.use(emsUser.routes(), emsUser.allowedMethods());

const fdUser = require("./routes/fd/user");
app.use(fdUser.routes(), fdUser.allowedMethods());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
