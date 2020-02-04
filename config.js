module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret',
    },
    // webpage: remotemysql.com
    mysql: {
        host: process.env.MYSQL_HOST || '157.245.218.13',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'cechus',
        database: process.env.MYSQL_DB || 'node',
    }
}
