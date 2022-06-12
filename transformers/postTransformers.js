const moment = require('moment')
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
    return post;
}
const postsTransformer = (ArrayOfposts) => {
    return ArrayOfposts.map((singlepost) => postTransformer(singlepost))
};
module.exports = {
    postTransformer,
    postsTransformer
}