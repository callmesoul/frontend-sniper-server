'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
      const {INTEGER, DATE, STRING} = Sequelize;
      await queryInterface.createTable('emails', {
          id: {
              type: INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          email: STRING(40),
          appId:INTEGER,
          userId:INTEGER,
          createdAt:DATE,
          updatedAt:DATE,
          deletedAt:DATE,
      });
  },

  down: async(queryInterface, Sequelize) => {
      await queryInterface.dropTable('emails');
  }
};
