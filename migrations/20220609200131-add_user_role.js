'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'role',
      Sequelize.INTEGER // 1 = admin, 2 = normal user
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users',
      'role'
    );
  }
};
