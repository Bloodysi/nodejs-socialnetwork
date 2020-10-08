module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: 'nuestro__sctreoe'
  },
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'bloodysi',
    password: process.env.MYSQL_PASS || 'mundoparkour01',
    database: process.env.MYSQL_DB || 'nodejsSocial'
  },
  mysqlService: {
    port: process.env.PORT || 3001
  }
}