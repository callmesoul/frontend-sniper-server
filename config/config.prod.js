'use strict';

module.exports = appInfo => {
    const config = {};

    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'frontend-sniper',
        username: 'root',
        password: 'windowwei'

    };

    return config;
};
