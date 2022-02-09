/**
 * 配置Sequelize的数据库链接
 * 该文件主要用来创建mysql的数据库连接
 */
 const Sequelize = require('sequelize');
 const sequelize = new Sequelize('graduation_design','root','qqq520',{
     host:'172.21.40.25',
     dialect:'mysql',
     operatorsAliases:false,
     dialectOptions:{
         //字符集
         charset:'utf8mb4',
         collate:'utf8mb4_unicode_ci',
         supportBigNumbers: true,
         bigNumberStrings: true
     },
     pool:{
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
     },
     timezone: '+08:00'  //东八时区
 });
  
 module.exports = {
     sequelize
 };