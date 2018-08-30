module.exports = app => {
    const { INTEGER, DATE, STRING, UUID,UUIDV1, BOOLEAN} = app.Sequelize;

    const App = app.model.define('app', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emailNotice:{
            type:BOOLEAN,
            allowNull:false
        },
        name: {
            type:STRING(30),
            allowNull:false,
            comment:'应用名称'
        },
        userId:{
            type:INTEGER
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
        comment: "应用表",
        tableName: 'projects'
    });

    App.associate=function () {
        let model=app.model;
        model.App.hasMany(model.Error,{as:'appError',foreignKey:'appId'});
        model.App.hasMany(model.Email,{as:'appEmail',foreignKey:'appId'});
    };

    return App;
};