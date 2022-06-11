const models = require('../models');
const { isAdmin, isUser, signUser } = require('../services/auth');
const response = require('../services/response');
const fs = require('fs')
const { postTransformer, postsTransformer } = require('../transformers/postTransformers');


const index = async (req, res, next) => {
    const allowedOrderBy = { date: 'createdAt', views: 'views' }
    const orderBy = (allowedOrderBy[req?.query?.orderBy]) ? allowedOrderBy[req?.query?.orderBy] : 'id'
    const posts = await models.Post.findAll({
        where: {
            verified: 1
        },
        include: [
            models.User
        ],
        orderBy: [orderBy, 'DESC']
    })
    res.send(response.successResponse(postsTransformer(posts)))
};


//GET BY ID
const show = async (req, res, next) => {
    const post = await models.Post.findOne({
        where: {
            id: req.params.id,
            verified: 1
        },
        include: [
            models.User,
            models.Category,
            models.Tag
        ],
    });

    if (post) {
        post.views = post.views + 1
        post.save().then((post) => {
            res.send(response.successResponse(postTransformer(post)))
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('Post not found'))
    }
};


//POST
const create = async (req, res, next) => {
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const categories = req.body.categories
    const tags = req.body.tags
    if (title == '') {
        res.send(response.errorResponse('Please fill the post title'))
        return
    }
    if (content == '') {
        res.send(response.errorResponse('Please fill the post content'))
        return
    }
    const post = await models.Post.create({
        title,
        content,
        userId: req.user.id,
        views: 0,
        verified: isAdmin(req.user) ? 1 : 0,
        picture: req.file?.filename,
    })
    if (post) {
        if (Array.isArray(categories)) {
            post.setCategories(categories)
        }
        if (Array.isArray(tags)) {
            post.setTags(tags)
        }
        res.send(response.successResponse(postTransformer(post)))
    } else {
        res.send(response.errorResponse('An error occurred while adding the post'))
    }
};


//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Post.destroy({
        where: {
            id,
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'Post has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting Post'))
    }
}


//UPDATE
const update = async (req, res) => {
    const id = req.params.id;
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const categories = req.body.categories
    const tags = req.body.tags
    const post = await models.Post.findByPk(id);
    if (post) {
        if (title) {
            post.title = title
        };
        if (content) {
            post.content = content
        };
        if (Array.isArray(categories)) {
            post.setCategories(categories)
        }
        if (Array.isArray(tags)) {
            post.setTags(tags)
        }
        if (req.file) {
            fs.unlink('uploads/' + post.picture, () => { })
            post.picture = req.file?.filename
        }
        post.save().then((post) => {
            res.send(response.successResponse(postTransformer(post)));
            return
        })

    } else {
        res.status(404)
        res.send(response.errorResponse('The post is undefined'));
    };
};


module.exports = {
    index,
    show,
    create,
    remove,
    update,
}