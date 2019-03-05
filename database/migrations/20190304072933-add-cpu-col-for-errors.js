'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING,BOOLEAN,DECIMAL} = Sequelize;
    await queryInterface.addColumn('errors', 'cpu', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('errors', 'cpu');
  }
};
