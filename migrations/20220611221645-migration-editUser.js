'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
    );
  },
  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'email', {
      unique: false
    }
    );
  }
};
