module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Email = app.model.define('email', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: STRING(40),
        appId:INTEGER,
        userId:INTEGER,
        createdAt:DATE,
        updatedAt:DATE,
        deletedAt:DATE,
    },{
        engine: 'InnoDB',
        timestamps:true,
        paranoid:true,
        freezeTableName: true,
        underscored: false,
        comment: "通知邮件表",
        tableName: 'emails'
    });

    Email.associate=function () {
        let model=app.model;
    };

    return Email;
};