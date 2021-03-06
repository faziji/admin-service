/**
 * 发票
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "invoice",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //成交编号
      resultId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "resultId",
      },
      //成交结果名称
      resultName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "resultName",
      },
      // 公司名称
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "companyName",
      },
      // 银行
      bank: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "bank",
      },
      // 账号
      account: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "account",
      },
      // 发票金额
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "amount",
      },
      // 邮编
      postcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "postcode",
      },
      // 地址
      address: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "address",
      },
      // 电话
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "phone",
      },
      // 传真
      fax: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "fax",
      },
      // 附件
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "attachment",
      },
      // 创建时间
      createdAt: {
        type: DataTypes.DATE,
      },
      // 更新时间
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
