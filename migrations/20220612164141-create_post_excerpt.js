'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Posts',
      'excerpt',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ''
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Posts',
      'excerpt'
    );
  }
};
