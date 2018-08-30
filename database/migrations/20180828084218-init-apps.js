'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
      const {INTEGER, DATE, STRING, UUID,UUIDV1, BOOLEAN} = Sequelize;
      await queryInterface.createTable('projects', {
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
          deletedAt : DATE
      });
  },

  down: async(queryInterface, Sequelize) => {
      await queryInterface.dropTable('projects');
  }
};
