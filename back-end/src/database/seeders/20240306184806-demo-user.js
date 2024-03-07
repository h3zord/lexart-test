'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        fullName: 'lucas',
        email: 'lucas@test.com',
        password: '12345678',
        accountType: 'admin',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {})
  },
}
