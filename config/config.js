module.exports = {
    // environment: 'dev',
    database: {
      dbName: 'graduation_design',
      // host: 'localhost', // 本地数据库
      host: 'rm-wz9l7z23jd5t1j03i4o.mysql.rds.aliyuncs.com', // 云上数据库
      user: 'root',
      // password: 'qqq520', // 本地数据库
      password: 'Zxf520+++', // 云上数据库
      dialect:'mysql'
    },
    security: {
      secretKey: 'abcd',//用来生成token的key值
      expiresIn: 60 * 60 * 1000000 //过期时间, 相当于不会过期
    },
    // 七牛云的账号密码
    qiniu : {
      accessKey: "0fvHdec0nZtX6WuGKywipGL6KuSPnhpQw0x7-P8R",
      secretKey: "CzH3c4H3z3rCl1D1ALyJsxLU7JB37FyVjJnL0YOX",
      bucket: "zxf980207",
      origin: "up-z2.qiniup.com",
      url: "http://r8dp8c34q.hn-bkt.clouddn.com/"  // 后端返回文件数据时候链接此地址
    }
}