'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('cellphones', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.DataTypes.STRING,
      },
    })
  },

  async down(queryInterface) {
    return await queryInterface.dropTable('cellphones')
  },
}
