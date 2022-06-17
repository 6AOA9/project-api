const moment = require('moment');
const { postsTransformer } = require('./postTransformers');

const categoryTransformer = (category) => {
    if (category.createdAt) {
        category.dataValues.createdAt = moment(category.createdAt).fromNow();
    }
    if (category.updatedAt) {
        category.dataValues.updatedAt = moment(category.updatedAt).fromNow();
    }
    if (category.Posts) {
        category.Posts = postsTransformer(category.Posts)
    }
    return category;
}
const categoriesTransformer = (categories) => {
    return categories.map((category) => categoryTransformer(category))
};
module.exports = {
    categoriesTransformer,
    categoryTransformer
}