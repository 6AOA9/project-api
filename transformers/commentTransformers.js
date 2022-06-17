const { userTransformer } = require("./userTransformers");
const moment = require('moment');

const commentTransformer = (comment) => {
    if (comment.User) {
        comment.User = userTransformer(comment.User)
    }
    if (comment.createdAt) {
        comment.dataValues.createdAt = moment(comment.createdAt).fromNow();
    }
    if (comment.updatedAt) {
        comment.dataValues.updatedAt = moment(comment.updatedAt).fromNow();
    }
    // if (comment.Post) {
    //     comment.Post = postTransformer(comment.Post)
    // }
    return comment;
}
const commentsTransformer = (comments) => {
    return comments.map((comment) => commentTransformer(comment))
};
module.exports = {
    commentTransformer,
    commentsTransformer
}