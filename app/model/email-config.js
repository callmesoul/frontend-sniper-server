module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const EmailConfig = app.model.define('emailConfig', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: STRING(40),
        pass: STRING(40),
        server:STRING(20),
        createdAt:DATE,
        updatedAt:DATE,
        deletedAt:DATE,
    },{
        engine: 'InnoDB',
        timestamps:true,
        paranoid:true,
        freezeTableName: true,
        underscored: false,
        comment: "邮件配置",
        tableName: 'email-config'
    });

    EmailConfig.associate=function () {
        let model=app.model;
    };

    return EmailConfig;
};