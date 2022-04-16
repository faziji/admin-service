const emsUser = require("./ems/user");
const emsResource = require("./ems/resource");
const emsSupplier = require("./ems/supplier");
const emsTender = require("./ems/tender");
const emsFinancial = require("./ems/financial");

const fdUser = require("./fd/user");
const fdResource = require("./fd/resource");
const fdGuide = require("./fd/guide");


class initLocalRouters {
  static initRouters(app){
    app.use(emsUser.routes(), emsUser.allowedMethods());
    app.use(emsResource.routes(), emsResource.allowedMethods());
    app.use(emsSupplier.routes(), emsSupplier.allowedMethods());
    app.use(emsTender.routes(), emsTender.allowedMethods());
    app.use(emsFinancial.routes(), emsFinancial.allowedMethods());

    app.use(fdUser.routes(), fdUser.allowedMethods());
    app.use(fdResource.routes(), fdResource.allowedMethods());
    app.use(fdGuide.routes(), fdGuide.allowedMethods());


  }
}

module.exports = initLocalRouters;
