module.exports = app => {
    const { INTEGER, DATE, STRING, UUID,UUIDV1, BOOLEAN} = app.Sequelize;

    const App = app.model.define('app', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        appId:{
            type: UUID,
            allowNull:false,
            defaultValue:UUIDV1
        },
        appScrect:{
            type: UUID,
            allowNull:false,
            defaultValue:UUIDV1
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
        tableName: 'apps'
    });

    App.associate=function () {
        let model=app.model;
        model.App.hasMany(model.Error,{foreignKey:'appId'});
        model.App.belongsTo(model.User,{foreignKey:'userId'});
        model.App.hasMany(model.Email,{foreignKey:'appId'});
    };

    return App;
};