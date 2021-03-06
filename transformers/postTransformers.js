const moment = require('moment')
const { commentsTransformers } = require('./commentTransformers')
const { userTransformer } = require('./userTransformers')

const postTransformer = (post) => {
    post.picture = `${process.env.URL + '' + process.env.UPLOADS + '' + post.picture}`
    if (post.User) {
        post.User = userTransformer(post.User)
    }
    if (post.createdAt) {
        post.dataValues.createdAt = moment(post.createdAt).fromNow();
    }
    if (post.updatedAt) {
        post.dataValues.updatedAt = moment(post.updatedAt).fromNow();
    }
    if (post.Comments) {
        post.Comments = commentsTransformers(post.Comments)
    }
    return post;
}
const postsTransformer = (posts) => {
    return posts.map((singlepost) => postTransformer(singlepost))
};
module.exports = {
    postTransformer,
    postsTransformer
}