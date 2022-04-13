const emsUser = require("./ems/user");
const emsResource = require("./ems/resource");
const emsSupplier = require("./ems/supplier");

const fdUser = require("./fd/user");
const fdResource = require("./fd/resource");


class initLocalRouters {
  static initRouters(app){
    app.use(emsUser.routes(), emsUser.allowedMethods());
    app.use(emsResource.routes(), emsResource.allowedMethods());
    app.use(emsSupplier.routes(), emsSupplier.allowedMethods());

    app.use(fdUser.routes(), fdUser.allowedMethods());
    app.use(fdResource.routes(), fdResource.allowedMethods());


  }
}

module.exports = initLocalRouters;
