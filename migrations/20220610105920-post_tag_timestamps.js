'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'post_tag',
        'createdAt',
        Sequelize.DATE
      ),
      queryInterface.addColumn(
        'post_tag',
        'updatedAt',
        Sequelize.DATE
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'post_tag',
        'createdAt'
      ),
      queryInterface.removeColumn(
        'post_tag',
        'updatedAt'
      )
    ])
  }
};
