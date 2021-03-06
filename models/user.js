'use strict';
const md5 = require('md5')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    avatar: {
      type: DataTypes.VIRTUAL,
      get() {
        return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?s=130'
      },
      set(value) {
        console.log(value)
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};