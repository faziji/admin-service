const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config").security;
const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");


async function verify(ctx, next) {
  // 管理系统的白名单列表设置
  const whiteListUrl = {
    // GET: ["/api/user/test"],
    GET: [],
    POST: ["/api/user/login", "/api/user/uploadFile"],
  };
  // 前台的白名单设置：所有携带/fontEnd的路由都无需验证token
  const fontEndString = "/fontEnd";

  const hasOneOf = (str, arr) => arr.some((item) => item.includes(str));
  let method = ctx.request.method;
  let path = ctx.request.path;

  let token = ctx.request.headers["authorization"];

  console.log('1111111111', path);

  if (
    path.includes(fontEndString) ||
    path.includes("/favicon.ico") ||
    (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method]))
  ) {
    await next();
  } else if (!token) {
    throw new HttpException("no token");
  } else {
    try {
      var decode = jwt.verify(token, secretKey);
    } catch (error) {
      throw new Forbidden("口令无效");
    }
    await next();
  }
}

module.exports = verify;
