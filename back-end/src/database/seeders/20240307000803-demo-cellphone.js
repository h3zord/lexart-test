'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('cellphones', [
      {
        name: 'iphone 15 pro max',
        brand: 'apple',
        model: '15 pro max',
        color: 'white',
        price: 7000,
      },
      {
        name: 'xiaomi poco x5',
        brand: 'xiaomi',
        model: 'poco x5',
        color: 'black',
        price: 2000,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('cellphones', null, {})
  },
}
