/**
 * 配置Sequelize的数据库链接
 * 该文件主要用来创建mysql的数据库连接
 */
const Sequelize = require("sequelize");
const { dbName, user, password, host, dialect } =
  require("../config/config").database;
const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect, // 数据库类型
  operatorsAliases: false,
  dialectOptions: {
    //字符集
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+08:00", //东八时区
});

module.exports = {
  sequelize,
};
