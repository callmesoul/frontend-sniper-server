'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn('errors','userId',{
        type:Sequelize.INTEGER,
          allowNull: true
      })
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('erros', 'userId');
  }
};
