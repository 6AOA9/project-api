'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Posts', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Posts',
      'verified'
    );
  }
};
