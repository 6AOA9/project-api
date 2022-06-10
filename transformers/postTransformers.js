const { userTransformer } = require('./userTransformers')

const postTransformer = (post) => {
    post.picture = `${process.env.URL + '' + process.env.UPLOADS + '' + post.picture}`
    if (post.User) {
        post.User = userTransformer(post.User)
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