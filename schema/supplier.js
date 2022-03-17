/**
 * 供应商
 * 1：模拟请求必传
 * 0：模拟请求选传
 *
 * allowNull数据库中是否允许为空
 */
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "supplier",
    {
      // 1id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      // 1用户名
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "username",
      },
      // 1公司名称: 与企业公章相符，不含其他字符
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "companyName",
      },
      // 1密码
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      // 1联系人名称
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
      // 1联系人电话
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "phone",
      },
      // 1联系人邮箱
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email",
      },

      // 0邀请人
      inviter: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "inviter",
      },
      // 0备注
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "note",
      },
      // 0审核人
      reviewer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "reviewer",
      },
      // 0审核信息：不通过反馈
      reviewInfo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "reviewInfo",
      },
      // 0用户头像
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "5f6fd5d0-a362-11ec-88cd-638c2ca3f683.png",
        field: "avatar",
      },
      // 0状态
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "enable",
        field: "status",
      },
      // 0评分
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60,
        field: "score",
      },
      // 0身份权限
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "supplier-reviewing",
        field: "role",
      },
      // 0收款账户：银行卡
      shoukuanAccount: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "shoukuanAccount",
      },
      // 0付款账号：银行卡
      fukuanAccount: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "fukuanAccount",
      },
      // 0付款人/付款公司
      fukuan: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "fukuan",
      },
      // 0收款人/收款公司
      shoukuan: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "shoukuan",
      },
      // 0创建时间
      createdAt: {
        type: DataTypes.DATE,
      },
      // 0更新时间
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      /**
       * 如果为true，则表示名称和model相同，即user
       * 如果为fasle，mysql创建的表名称会是复数，即users
       * 如果指定的表名称本身就是复数，则形式不变
       */
      freezeTableName: false,
    }
  );
};
