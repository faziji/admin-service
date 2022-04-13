/**
 * 指南列表，只剩下key、hash、id、status字段即可
 * status枚举值：1国家；2地方；3企业； 4采购案例
 */

const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "guide",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name",
      },
      // 指南类型：政策法规、办事指南
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "type",
      },
      //  * 枚举值：1国家；2地方；3企业； 4采购案例
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 1,
        field: "status",
      },
      // 资源哈希码
      hash: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "hash",
      },
      // 资源key值
      key: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "key",
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
      freezeTableName: true,
    }
  );
};
