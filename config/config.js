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
    }
}