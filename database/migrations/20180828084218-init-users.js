'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
      const {INTEGER, DATE, STRING} = Sequelize;
      await queryInterface.createTable('users', {
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
      });
  },

  down: async(queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
  }
};
