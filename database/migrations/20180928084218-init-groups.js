'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
      const {INTEGER, DATE, STRING} = Sequelize;
      await queryInterface.createTable('groups', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: STRING(30),
      });
  },

  down: async(queryInterface, Sequelize) => {
      await queryInterface.dropTable('groups');
  }
};
