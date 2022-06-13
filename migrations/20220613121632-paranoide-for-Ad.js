'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Ads',
      'deletedAt',
      {
        type: Sequelize.DATE,
        paranoid: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Ads',
      'deletedAt'
    );
  }
};
