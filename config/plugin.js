'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}

exports.graphql = {
    enable: true,
    package: 'egg-graphql',
};

exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};
exports.jwt = {
    enable: true,
    package: "egg-jwt"
};