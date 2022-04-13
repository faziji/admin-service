const jwt = require("jsonwebtoken");
// const koaStatic = require("koa-static"); // move app.js:sometime error
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const json = require("koa-json");
const logger = require("koa-logger");
const bodyparser = require("koa-bodyparser");
const views = require("koa-views");
const cors = require("koa-cors");
const router = require("koa-router");
const { getToken } = require("../utils");

// init local routes
const initLocalRouters = require("../routes");

const { secretKey } = require("../config/config").security;

class InitManager {
  static initCore(app) {
    InitManager.app = app;

    // 初始化koa2框架基础配置
    InitManager.initBaseConfig(app);

    // 初始化全局属性
    InitManager.loadConfig();
    InitManager.loadHttpException();

    // 接口拦截器
    InitManager.routerFilter();

    // 初始化路由
    initLocalRouters.initRouters(app);
  }

  static routerFilter() {
    InitManager.app.use(async (ctx, next) => {
      // 管理系统的白名单列表设置
      const whiteListUrl = {
        GET: [],
        POST: ["/api/user/login", "/api/user/uploadFile"],
      };
      // 前台的白名单设置：所有携带/fontEnd的路由都无需验证token
      const fontEndString = "/fontEnd";

      const hasOneOf = (str, arr) => arr.some((item) => item.includes(str));
      let method = ctx.request.method;
      let path = ctx.request.path;
      let token = getToken(ctx);

      let referer = ctx.request.header.referer

      // api地址包含以下几个字段时无需验证token
      if (
        // 兼容前台 => 待优化
        referer.includes("/welcome") ||
        referer.includes("/register") ||


        path.includes("/fontEnd") || // 适配前端的绝大部分请求无需验证token
        path.includes("/upload") || // bug
        path.includes("/files") || // bug
        path.includes("/favicon.ico") || // 加载public文件夹内容不需token
        (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method]))
        ) {
        await next();
      } else if (!token) {
        ctx.response.status = 401;
        ctx.body = new global.errs.Forbidden("no token");
      } else {
        try {
          var decode = jwt.verify(token, secretKey);
        } catch (error) {
          throw new global.errs.Forbidden("口令无效");
        }
        await next();
      }
    });
  }

  // 现在通过全局的global变量中就可以取到当前的环境啦
  static loadConfig() {
    const configPath = process.cwd() + "/config/config.js";
    const config = require(configPath);
    global.config = config;
  }
  // div handle error
  static loadHttpException() {
    const errors = require("./http-exception");
    global.errs = errors;
  }

  // init router
  static initRouter() {
    InitManager.app.use(router.allowedMethods());
  }

  // 初始化koa2框架基础配置
  static initBaseConfig(app) {
    // koa-static
    // app.use(koaStatic(__dirname + "/public"));

    // error handler
    // onerror(app);

    //  文件处理：接收post参数解析，写在路由和bodyparser的前面
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

    // json
    app.use(json());

    // logger
    app.use(logger());

    // views
    app.use(
      views(__dirname + "/views", {
        extension: "pug",
      })
    );

    //hanle cors
    app.use(cors());
    // app.use(async (ctx, next)=> {
    //   ctx.set('Access-Control-Allow-Origin', '*');
    //   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //   if (ctx.method == 'OPTIONS') {
    //     ctx.body = 200; 
    //   } else {
    //     await next();
    //   }
    // });
    // ctx.set("Access-Control-Allow-Origin", "*")
    // app.use(
    //   cors({
    //       origin: function(ctx) { //设置允许来自指定域名请求
    //           // if (ctx.url === '/test') {
    //             // console.log('1111111111111111');
    //               // return '*'; // 允许来自所有域名请求
    //           // }
    //           return 'http://localhost:3001'; //只允许http://localhost:8080这个域名的请求
    //       },
    //       maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    //       credentials: true, //是否允许发送Cookie
    //       allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    //       allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    //       exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    //   })
    // );

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
  }
}

module.exports = InitManager;
