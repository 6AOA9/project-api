'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('post_tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('post_tag');
  }
};
