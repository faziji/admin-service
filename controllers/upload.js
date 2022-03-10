const {
  ParameterException,
  DatabaseNotFoundException,
  HttpException,
  Success,
  Forbidden,
} = require("../core/http-exception");
//   用于更新用户头像
const UserModel = require("../modules/user");

const uuid = require("uuid");
const fs = require("fs");

const func = require("./../utils/upload");

class getAlbumController {
  //上传图片七牛云
  static async uploadFile2(ctx) {
    try {
      // 前端必须以formData格式进行文件的传递
      const file = ctx.request.files.file; // 获取上传文件
      let username = ctx.request.body["username"];
      if (file) {
        // 命名文件
        const fileName = uuid.v1();
        // 创建文件可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        const ext = file.name.split(".").pop();
        // 命名文件以及拓展名
        const fileUrl = `${fileName}.${ext}`;
        // 调用方法(封装在utils文件夹内)
        const result = await func.upToQiniu(reader, fileUrl);
        /**
         * 上传成功会返回一个hash和key属性
         * 上传失败返回error属性
         */
        if (result && result?.hash && result?.key) {
            try {
                await UserModel.updateUserDetail(username, {avatar: result.key});
            } catch (error) {
                throw new HttpException("服务器上传头像失败")
            }
          ctx.response.status = 200;
          ctx.body = new Success("上传成功！", result);
        } else {
          ctx.response.status = 200;
          ctx.body = new HttpException("上传失败！");
        }
      } else {
        ctx.response.status = 400;
        ctx.body = new ParameterException("没有选择图片");
      }
    } catch (err) {
      ctx.response.status = 501;
      ctx.body = new HttpException("上传错误");
    }
  }
}

module.exports = getAlbumController;
