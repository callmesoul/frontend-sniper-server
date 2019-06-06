module.exports = app => {
    const { STRING, INTEGER, DATE,TEXT} = app.Sequelize;

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
            type:TEXT,
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
            type:INTEGER,
            allowNull: false
        },
        userId:{
            type:INTEGER,
            allowNull: true
        },
        ua:{
            type:STRING,
            allowNull: true,
        },
        browser:{
            type:STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('browser', JSON.stringify(val));
            },
            get() {
                const browser = this.getDataValue('browser');
                return JSON.parse(browser);
            },
        },
        engine:{
            type:STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('engine', JSON.stringify(val));
            },
            get() {
                const engine = this.getDataValue('engine');
                return JSON.parse(engine);
            },
        },
        os:{
            type:STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('os', JSON.stringify(val));
            },
            get() {
                const os = this.getDataValue('os');
                return JSON.parse(os);
            },
        },
        device:{
            type:STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('device', JSON.stringify(val));
            },
            get() {
                const device = this.getDataValue('device');
                return JSON.parse(device);
            },
        },
        cpu:{
            type:STRING,
            allowNull: true,
            set(val) {
                this.setDataValue('cpu', JSON.stringify(val));
            },
            get() {
                const cpu = this.getDataValue('cpu');
                return JSON.parse(cpu);
            },
        },
        records:{
            type:TEXT,
            allowNull: false,
            defaultValue:'[]',
            remark:'用户操作记录 用户还原用户操作',
            set(val) {
                this.setDataValue('records', JSON.stringify(val));
            },
            get() {
                const records = this.getDataValue('records');
                console.log('===records=',records);
                if(records){
                    return JSON.parse(records);
                }else{
                    return [];
                }
            },
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
        model.Error.belongsTo(model.App,{foreignKey:'appId'});
        model.Error.belongsTo(model.User,{foreignKey:'userId'});
    };

    return Error;
};
