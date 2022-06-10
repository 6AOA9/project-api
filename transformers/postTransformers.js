const postTransformers = (post) => {
    post.photo = `${process.env.URL + process.env.UPLOADS + post.photo}`
    return post;
}
const postsTransformers = (ArrayOfposts) => {
    return ArrayOfposts.map((singlepost) => postTransformers(singlepost))
};
module.exports = {
    postTransformers,
    postsTransformers
}