module.exports = app => {
    const DataTypes = app.Sequelize;

    const User = app.model.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "用户名"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "密码"
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored:false
    });

    User.associate = function() {

    }

    return User;
};