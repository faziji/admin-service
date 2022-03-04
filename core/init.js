const jwt = require("jsonwebtoken");
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const json = require("koa-json");
const logger = require("koa-logger");
const bodyparser = require("koa-bodyparser");
const views = require("koa-views");
const cors = require("koa-cors");
const router = require("koa-router");
const koaStatic = require("koa-static");

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
      let token = ctx.request.headers["authorization"];

      if (
        path.includes("/fontEnd") ||
        path.includes("/upload") || // bug
        path.includes("/favicon.ico") || // 加载public文件夹内容不需token
        (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method]))
      ) {
        await next();
      } else if (!token) {
        throw new global.errs.HttpException("no token");
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
    app.use(koaStatic(__dirname + "/public"));

    // error handler
    onerror(app);

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
