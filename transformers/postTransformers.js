const postTransformer = (post) => {
    post.picture = `${process.env.URL + '' + process.env.UPLOADS + '' + post.picture}`
    return post;
}
const postsTransformer = (ArrayOfposts) => {
    return ArrayOfposts.map((singlepost) => postTransformer(singlepost))
};
module.exports = {
    postTransformer,
    postsTransformer
}