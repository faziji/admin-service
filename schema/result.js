/**
 * 成交结果
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "result",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //成交结果名称
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name",
      },
      //公告编号
      announcementId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "announcementId",
      },
      //公告名称
      announcementName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "announcementName",
      },
      //供应商账号
      supplierUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "supplierUsername",
      },
      //供应商姓名
      supplierName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "supplierName",
      },
      // 成交投标金额
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "amount",
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
