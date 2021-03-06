const models = require('../models');
const response = require('../services/response');
const fs = require('fs');
const { commentsTransformer } = require('../transformers/commentTransformers');


//INDEX
const index = async (req, res) => {
    const comments = await models.Comment.findAll({
        include: [
            {model: models.Post},
            {model: models.User},
        ],
        orderBy: ['title', 'ASC']
    })
    if (comments) {
        res.send(response.successResponse(commentsTransformer(comments)))
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
};



//STORE
const store = async (req, res, next) => {
    const content = String(req.body.content?.trim())
    const postId = req.body.postId
    if (content == '') {
        res.send(response.errorResponse('Please fill the Comment content'))
        return
    }
    const comment = await models.Comment.create({
        content,
        userId: req.user.id,
        postId: req.body.postId,
    })
    if (comment) {
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
    remove,
    index
}