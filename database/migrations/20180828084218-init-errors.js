'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
      const {INTEGER, DATE, STRING} = Sequelize;
      await queryInterface.createTable('errors', {
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
              type:STRING,
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
              type:INTEGER
          },
          createdAt:DATE,
          updatedAt:DATE,
          deletedAt:DATE

      });
  },

  down: async(queryInterface, Sequelize) => {
      await queryInterface.dropTable('errors');
  }
};
