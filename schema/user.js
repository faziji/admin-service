/**
 * schema数据表模型
 * 在schema目录下新建一个user.js文件，该文件的主要作用就是建立与数据表的对应关系，也可以理解为代码的建表。
 */
 const moment = require("moment");
 module.exports = function(sequelize,DataTypes){
     return sequelize.define('user',{
         id:{
             type: DataTypes.INTEGER,
             primaryKey: true,
             allowNull: true,
             autoIncrement: true
         },
         //姓名
         username:{
             type: DataTypes.STRING,
             allowNull: false,
             field: 'username'
         },
         //密码
         password:{
             type: DataTypes.INTEGER,
             allowNull: false,
             field: 'password'
         },
        //  权限身份
         role:{
             type: DataTypes.STRING,
             allowNull: false,
             defaultValue:'user',
             field: 'role'
         },
        //  用户头像
         avatar:{
             type: DataTypes.STRING,
             allowNull: false,
             defaultValue:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
             field: 'avatar'
         },
         // 姓名
          name:{
             type: DataTypes.STRING,
             allowNull: true,
             field: 'name'
         },
        //  邮箱
         email:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email'
        },
        // 电话号码
         phone:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'phone'
        },
         // 创建时间
         createdAt:{
            type: DataTypes.DATE
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE
        }
     },{
         /**
          * 如果为true，则表示名称和model相同，即user
          * 如果为fasle，mysql创建的表名称会是复数，即users
          * 如果指定的表名称本身就是复数，则形式不变
          */
         freezeTableName: false,
     });
 }