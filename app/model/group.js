module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Group = app.model.define('group', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(30),
        createdAt: DATE,
        updatedAt: DATE,
        deletedAt : DATE,
    },{
        engine: 'InnoDB',
        timestamps:true,
        paranoid:true,
        freezeTableName: true,
        underscored: false,
        comment: "用户组表",
        tableName: 'groups'
    });

    Group.associate=function () {
        let model=app.model;
        model.Group.hasMany(model.User,{foreignKey:'groupId'});
    };

    return Group;
};