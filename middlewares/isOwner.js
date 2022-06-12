const { errorResponse } = require("../services/response")
const models = require('../models')

exports.isOwner = (type) => {
    return async (req, res, next) => {
        if (req.user.role === 1) {
            return next()
        };
        switch (type) {
            case 'profile':
                const id = req.params?.id
                if (req.user.id === id) {
                    return next()
                }
                res.status(403)
                res.send(errorResponse('You are not authorized'))
                return
            case 'post':
                const postId = req.params.id
                const post = await models.Post.findByPk(postId)
                if (post.userId === req.user.id) {
                    return next()
                }
                res.status(403)
                res.send(errorResponse('You are not authorized'))
                return
        };
    };
};