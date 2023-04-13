const env = process.env;
const dbConfigData = {
    host: env.MYSQL_HOST,
    user: env.DB_USER || 'root',
    password: env.MYSQL_ROOT_PASSWORD,
    database: env.MYSQL_DATABASE,
    port: env.MYSQL_PORT || 3306
};

module.exports = dbConfigData;