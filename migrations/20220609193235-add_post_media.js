'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Posts',
      'picture',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Posts',
      'picture'
    );
  }
};
