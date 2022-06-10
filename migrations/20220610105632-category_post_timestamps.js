'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'category_post',
        'createdAt',
        Sequelize.DATE
      ),
      queryInterface.addColumn(
        'category_post',
        'updatedAt',
        Sequelize.DATE
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'category_post',
        'createdAt'
      ),
      queryInterface.removeColumn(
        'category_post',
        'updatedAt'
      )
    ])
  }
};
