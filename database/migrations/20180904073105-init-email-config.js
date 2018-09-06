'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const {INTEGER, DATE, STRING} = Sequelize;
        await queryInterface.createTable('email-config', {
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
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('email-config');
    }
};
