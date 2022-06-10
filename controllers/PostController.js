const models = require('../models');
const { isAdmin } = require('../services/auth');
const response = require('../services/response');
const postTransformers = require('../transformers/postTransformers');


//SHOW
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
    res.send(response.successResponse(posts))
};


//GET BY ID
const show = async (req, res, next) => {
    const currentPost = await models.Post.findByPk(req.params.id, {
        // include: [{
        //     model: models.,
        // }],
    });
    currentPost.views = currentPost.views + 1
    currentPost.save()
    if (currentPost) {
        res.send(successResponse('', { user: postTransformers(currentPost) }))
    } else {
        res.send(errorResponse('There was an error'))
    }
};


//POST
const create = async (req, res, next) => {
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const categories = req.body.categories
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
        picture: req.file.filename,
    })
    if (post) {
        console.log(categories)
        if (Array.isArray(categories)) {
            post.setCategories(categories)
        }
        res.send(response.successResponse(post))
    } else {
        res.send(response.errorResponse('An error occurred while adding the post'))
    }
};


//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const userId = req.user.id
    const postDelete = await models.Post.findByPk(id)
    if (postDelete) {
        if (userId == postDelete.userId) {
            const deleted = await models.Post.update({ deletedAt: new Date() }, {
                where: {
                    id: id
                }
            });
            if (deleted) {
                res.send(response.successResponse('Post has been deleted'))
                return
            };
        };
    };
    res.send(response.errorResponse('An error occurred while deleting Post'))
}


//UPDATE
const update = async (req, res) => {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    const id = req.params.id;
    const Post = await models.Post.findByPk(id);
    if (Post) {
        if (req.body.title) {
            Post.title = req.body.title
        };
        if (req.body.content) {
            Post.content = req.body.content
        };

        Post.save()
        response.message.push("Post has been updated");
        response.success = true;
        response.data = Post;
        res.send(response);
    } else {
        response.message.push("not found");
        res.send(response);
    };
};


module.exports = {
    index,
    show,
    create,
    remove,
    update,
}