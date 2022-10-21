'use strict';
const { v1 } = require('uuid');
const crypto = require('crypto');

const password = 'showpay1234';
const md5Password = crypto.createHash('md5').update(password).digest('hex');
const doubuleMd5Password = crypto
  .createHash('md5')
  .update(md5Password)
  .digest('hex');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'admins',
      [
        {
          id: v1(),
          username: 'admin',
          password: doubuleMd5Password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  },
};
