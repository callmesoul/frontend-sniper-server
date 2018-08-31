'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530610351276_4396';

    // add your config here
    config.middleware = ['checkAuth','graphql'];

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

    config.graphql = {
        router: '/graphql',
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
        // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
        graphiql: true,
        // graphQL 路由前的拦截器
        onPreGraphQL: function* (ctx) {
            console.log('graphQL',ctx)
        },
        // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
        onPreGraphiQL: function* (ctx) {
            console.log('graphQL',ctx)
        },
    };

    config.security = {
        csrf: false
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true,
    };

    config.view = {
        mapping: {
            '.ejs': 'ejs',
        },
    };

    return config;
};
