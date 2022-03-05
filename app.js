const Koa = require("koa");
const app = new Koa();
const InitManager = require('./core/init');

// move to init.js: sometime wrong
app.use(require("koa-static")(__dirname + "/public"));

InitManager.initCore(app);

module.exports = app;
