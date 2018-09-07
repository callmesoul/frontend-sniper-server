'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.addColumn('email-config','userId',{
        type:Sequelize.INTEGER,
          allowNull: true
      })
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('email-config', 'userId');
  }
};
