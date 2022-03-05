/**
 * 判断对象是否为空对象
 */
function isEmptyObject(data) {
  return JSON.stringify(data) == "{}";
}

/**
 * 获取token
 */
function getToken(ctx) {
  return ctx.request.headers["authorization"];
}

module.exports = {
  isEmptyObject,
  getToken,
};
