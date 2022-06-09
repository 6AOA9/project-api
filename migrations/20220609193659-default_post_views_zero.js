'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Posts', 'views', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
