'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530610351276_4396';

    // add your config here
    config.middleware = ['checkAuth'];

    config.security = {
        csrf: {
            ignore: () => true,
        },
    };

    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'frontend-sniper',
        username: 'root',
        password: 'root'
    };
    config.jwt = {
        secret: "FrontSniperServer"
    };

    config.email={
        user: '',
        pass: '',
        server:'',
    };

    config.security = {
        csrf: false,
        domainWhiteList: [ 'http://127.0.0.1:8080' ],
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };

    config.view = {
        mapping: {
            '.ejs': 'ejs',
        },
    };

    return config;
};
