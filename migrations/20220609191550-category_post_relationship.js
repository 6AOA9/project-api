'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('category_post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('category_post');
  }
};
