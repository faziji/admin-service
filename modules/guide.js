// 引入mysql的配置文件
const db = require("../core/db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型：指南列表
const guide = Sequelize.import("../schema/guide");
guide.sync({ force: false }); //自动创建表

class guideModel {
    // 获取政策指南、办事指南、党建工作
    static async getGuideList(data) {
        return await guide.findAll({
          where: data,
        });
      }
    // 创建政策指南
    static async createPolicyList(data) {
        return await guide.create(data);
    }

    

    // createPolicyList

}

module.exports = guideModel;
