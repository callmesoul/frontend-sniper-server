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
        model.User.hasMany(model.App,{as:'userApp',targetKey:'id',foreignKey:'userId'});
        //用户 <--> 错误   1:m
        model.User.hasMany(model.Error,{as:'userError',targetKey:'id',foreignKey:'userId'});
        //用户 <--> 通知邮件箱地址   1:m
        model.User.hasMany(model.Email,{as:'userEmail',targetKey:'id',foreignKey:'userId'});

    };

    return User;
};