'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User);
      models.Post.belongsToMany(models.Category, {
        through: 'category_post',
        foreignKey: 'postId'
      });
      models.Post.belongsToMany(models.Tag, {
        through: 'post_tag',
        foreignKey: 'postId'
      });
      models.Post.hasMany(models.Comment);
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN,
    views: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true
  });
  return Post;
};