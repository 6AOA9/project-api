'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     
    return queryInterface.removeColumn(
      'Users',
      'profilePicture'
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.addColumn(
      'Users',
      'profilePicture',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      }
    );
  }
};
