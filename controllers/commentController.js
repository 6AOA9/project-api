const models = require('../models');
const response = require('../services/response');
const fs = require('fs')
const { isUser } = require('../services/auth');

// const { postTransformer, postsTransformer } = require('../transformers/postTransformers');


//STORE
const store = async (req, res, next) => {
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const userId = req.body.userId
    const postId = req.body.postId
    if (title == '') {
        res.send(response.errorResponse('Please fill the Comment title'))
        return
    }
    if (content == '') {
        res.send(response.errorResponse('Please fill the Comment content'))
        return
    }
    const comment = await models.Comment.create({
        title,
        content,
        userId: req.user.id,
        postId: req.body.postId,
    })
    if (comment) {
        if (Array.isArray(userId)) {
            comment.setuserId(userId)
        }
        if (Array.isArray(postId)) {
            comment.setpostId(postId)
        }
        res.send(response.successResponse(comment))
    } else {
        res.send(response.errorResponse('An error occurred while adding the comment'))
    }
};



//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Comment.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'Comment has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting Comment'))
    };
};

module.exports = {
    store,
    remove
}