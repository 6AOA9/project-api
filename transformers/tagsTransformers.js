const moment = require('moment');
const { postsTransformer } = require('./postTransformers');

const tagTransformer = (tag) => {
    
    if (tag.createdAt) {
        tag.dataValues.createdAt = moment(tag.createdAt).fromNow();
    }
    if (tag.updatedAt) {
        tag.dataValues.updatedAt = moment(tag.updatedAt).fromNow();
    }
    if (tag.Posts) {
        tag.Posts = postsTransformer(tag.Posts)
    }
    return post;
}
const tagsTransformer = (tags) => {
    return tags.map((tag) => tagTransformers(tag))
};
module.exports = {
    tagsTransformer,
    tagTransformer
}