module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: STRING(30),
        password: STRING(30),
        email:STRING,
        groupId:{
            type: INTEGER,
            default:2
        },
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt : DATE,
    },{
        engine: 'InnoDB',
        timestamps:true,
        paranoid:true,
        freezeTableName: true,
        underscored: false,
        comment: "用户表",
        tableName: 'users'
    });

    User.associate=function () {
        let model=app.model;
        //用户 <--> 应用   1:m
        model.User.hasMany(model.App,{foreignKey:'userId'});
        //用户 <--> 错误   1:m
        model.User.hasMany(model.Error,{foreignKey:'userId'});
        //用户 <--> 通知邮件箱地址   1:m
        model.User.hasMany(model.Email,{foreignKey:'userId'});
        model.User.belongsTo(model.Group,{foreignKey:'groupId'});

    };

    return User;
};