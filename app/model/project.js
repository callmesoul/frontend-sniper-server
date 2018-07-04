module.exports = app => {
    const DataTypes = app.Sequelize;

    const Project = app.model.define('project', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "用户名"
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored:false
    });

    Project.associate = function() {

    }

    return User;
};