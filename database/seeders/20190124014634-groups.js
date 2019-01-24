'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('groups', [{
        id:1,
        name: 'superAdmin',
      },{
        id:2,
        name: 'admin',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  }
};
