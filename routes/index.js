const emsUser = require("./ems/user");
const fdUser = require("./fd/user");

class initLocalRouters {
  static initRouters(app){
    app.use(fdUser.routes(), fdUser.allowedMethods());
    app.use(emsUser.routes(), emsUser.allowedMethods());
  }
}

module.exports = initLocalRouters;
