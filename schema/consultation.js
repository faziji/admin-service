/**
 * 征询意见表
 */

const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "consultation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      //意见名称
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
      //描述
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "description",
      },
      //发布时间
      publishTime: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "publishTime",
      },
      //开始时间
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "startTime",
      },
      //结束时间
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "endTime",
      },
      //状态： 0:未发布 1:正常 2:已结束 3:已终止
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "status",
      },
      //发布人
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "publisher",
      },
      // 资源哈希码
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "hash",
      },
      // 资源key值
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "key",
      },
      // 阅读次数
      viewTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "viewTime",
      },
      // 附件
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "attachment",
      },
      // 关联公示
      association: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "association",
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
