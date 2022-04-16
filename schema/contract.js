/**
 * 合同表
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "contract",
    {
      // 主合同编号
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //签约公司社会统一信用码
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "username",
      },
      //签约公司名称
      contractName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "contractName",
      },
      //签约客户名称
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name",
      },
      // 采购负责人
      mangerName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "mangerName",
      },
      //成交结果Id
      resultId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "resultId",
      },
      //成交结果名称
      resultName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "resultName",
      },
      //我方公司名称
      company: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "company",
      },
      //合同名称
      contractName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "contractName",
      },
      // 合同生效时间
      effectTime: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "effectTime",
      },
      // 合同约定生效方式
      chapter: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "chapter",
      },
      // 税率
      taxRate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "taxRate",
      },
      // 发票类型
      invoiceType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "invoiceType",
      },
      // 合同份数
      num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "num",
      },
      // 上传附件
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "attachment",
      },
      // 合同备注说明
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "remark",
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
