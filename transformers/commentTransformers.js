const { userTransformer } = require("./userTransformers");
const moment = require('moment')

const commentTransformers = (comment) => {
    if (comment.User) {
        comment.User = userTransformer(comment.User)
    }
    if (comment.createdAt) {
        comment.dataValues.createdAt = moment(comment.createdAt).fromNow();
    }
    if (comment.updatedAt) {
        comment.dataValues.updatedAt = moment(comment.updatedAt).fromNow();
    }
    return comment;
}
const commentsTransformers = (comments) => {
    return comments.map((comment) => commentTransformers(comment))
};
module.exports = {
    commentTransformers,
    commentsTransformers
}