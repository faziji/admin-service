const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../config/config").security;

/**
 * 判断对象是否为空对象
 */
function isEmptyObject(data) {
  return JSON.stringify(data) == "{}";
}

/**
 * 获取token
 */
function getToken(ctx = {}) {
  return ctx.request.headers["authorization"] || ctx.request.body["token"];
}

/**
 * 获取解码后的信息
 */
function getDecodeInfo(ctx) {
  let token = ctx?.request?.headers["authorization"] || "";
  let decode = jwt?.verify(token, secretKey);
  return decode;
}

module.exports = {
  isEmptyObject,
  getToken,
  getDecodeInfo,
};
