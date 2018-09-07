'use strict';

module.exports = appInfo => {
    const config = {};
    config.cluster = {
        listen: {
            port: 7000
        }
    };
    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'frontend-sniper',
        username: 'root',
        password: ''

    };

    return config;
};
