const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config").security;
const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");

/**
 * 排除不需要使用token的接口
 * 1. /api/user/login登录接口
 * 2. /api/user/uploadFile上传头像接口（bug待修复）
 */
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

  if (
    path.includes(fontEndString) ||
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
    // ctx.state.role = decode.role;
    // ctx.state.username = decode.username;
    await next();
  }
  //   console.log('333333333333', path);

  //   await next();

  // console.log('1111111111111', secretKey);
  // if(authorization){
  //     let token = authorization.split(" ")[1];
  //     let payload = jwt.verify(token,secretKey,(error,decoded)=>{
  //         if(error){
  //             ctx.body = {
  //                 status:-1,
  //                 msg:"登陆失效"
  //             };
  //         }
  //         else{
  //             ctx.token_data = decoded;
  //             return next();
  //         }
  //     });
  // }
  // else{
  //     return next();
  // }
}

module.exports = verify;
