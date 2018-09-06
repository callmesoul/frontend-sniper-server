'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn('errors','userId',{
        type:Sequelize.INTEGER,
          allowNull: false
      })
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('erros', 'userId');
  }
};
