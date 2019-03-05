'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530610351276_4396';

    // add your config here
    config.middleware = ['checkAuth'];

    config.checkAuth={
        match: '/api',
    };

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
        password: 'root',
        timezone: '+08:00' //东八时区
    };
    config.jwt = {
        secret: "FrontSniperServer"
    };

    config.email={
        user: '547437716@qq.com',
        pass: 'zmdgtcvqwszabehc',//POP3/SMTP服务授权码
        server:'QQ',
        /*
        QQ邮箱:QQ
        126邮箱:126
        163邮箱:163
        Gmail:Gmail
        阿里企业邮箱:qiye.aliyun
        Hotmail:Hotmail
        GandiMail:GandiMail
        * */
    };
    config.adminHost='http://localhost:8081';

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
