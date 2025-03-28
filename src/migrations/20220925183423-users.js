'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      display_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
