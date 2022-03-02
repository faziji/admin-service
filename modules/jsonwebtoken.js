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
  const whiteListUrl = {
    // GET: ["/api/user/detail"],
    GET: [],
    POST: ["/api/user/login"],
  };
  const hasOneOf = (str, arr) => arr.some((item) => item.includes(str));
  let method = ctx.request.method;
  let path = ctx.request.path;

  let token = ctx.request.headers["authorization"];

  if (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) {
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
