module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Error = app.model.define('error', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type:STRING,
            comment:'错误标题'
        },
        msg:{
            type:STRING,
            comment:'错误信息'
        },
        category:{
            type:STRING,
            comment:'错误类型'
        },
        level:{
            type:STRING,
            comment:'信息类型'
        },
        col:{
            type:INTEGER,
            comment:'行数'
        },
        line:{
            type:INTEGER,
            comment:'列数'
        },
        appId:{
            type:INTEGER
        },
        createdAt:DATE,
        updatedAt:DATE,
        deletedAt:DATE
    },{
        engine: 'InnoDB',
        timestamps:true,
        paranoid:true,
        freezeTableName: true,
        underscored: false,
        comment: "错误信息表",
        tableName: 'errors'
    });

    Error.associate=function () {
        let model=app.model;

    };

    return Error;
};