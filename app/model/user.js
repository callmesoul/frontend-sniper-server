module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        username: STRING,
        password: STRING(32)
    });

    User.associate = function() {
        app.model.Post.belongsTo(app.model.User, { as: 'user' });
    }

    return User;
};