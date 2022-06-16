const models = require('../models');
const { isAdmin, isUser, isOwner, signUser } = require('../services/auth');
const response = require('../services/response');
const fs = require('fs')
const { postTransformer, postsTransformer } = require('../transformers/postTransformers');


const index = async (req, res, next) => {
    const where = { verified: 1 }
    if (req.user) {
        if (isAdmin(req.user)) {
            delete where?.['verified'];
        }
    }
    const allowedOrderBy = { date: 'createdAt', views: 'views' }
    const orderBy = (allowedOrderBy[req?.query?.orderBy]) ? allowedOrderBy[req?.query?.orderBy] : 'id'
    const posts = await models.Post.findAll({
        where,
        include: [
            models.User
        ],
        orderBy: [orderBy, 'DESC']
    })
    res.send(response.successResponse(postsTransformer(posts)))
};



//BY CATEGORY
const index2 = async (req, res, next) => {
    const result = await models.Post.findAll({
        include: [
            {
                model: models.category_post,
                where: {
                    categoryId: req.body.categoryId,
                    postId: req.body.postId
                },
            },
        ],
    });
    if (result) {
        res.send(response.successResponse(result, res));
    } else {
        res.send(response.errorResponse("failed getting result"));
    };
};



//GET BY ID
const show = async (req, res, next) => {
    const where = {
        id: req.params.id
    }
    const post = await models.Post.findOne({
        where,
        include: [
            { model: models.User },
            { model: models.Category },
            { model: models.Tag },
            {
                model: models.Comment,
                include: [models.User]
            }
        ],
    });


    if (req.user) {
        if (!isAdmin(req.user) && !isOwner(req.user, post.userId)) {
            res.status(404)
            res.send(response.errorResponse('Post not found'))
            return
        }
    } else {
        if (post?.verified == 0) {
            res.status(404)
            res.send(response.errorResponse('Post not found'))
            return
        }
    }


    if (post) {
        post.views = post.views + 1
        post.save().then((post) => {
            res.send(response.successResponse(postTransformer(post)))
        })
        return
    } else {
        res.status(404)
        res.send(response.errorResponse('Post not found'))
    }
};


//POST
const create = async (req, res, next) => {
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const excerpt = String(req.body.excerpt?.trim())
    const categories = req.body.categories
    const tags = req.body.tags
    if (title == '') {
        res.send(response.errorResponse('Please fill the post title'))
        return
    };
    if (content == '') {
        res.send(response.errorResponse('Please fill the post content'))
        return
    };
    const post = await models.Post.create({
        title,
        content,
        userId: req.user.id,
        views: 0,
        verified: isAdmin(req.user) ? 1 : 0,
        picture: req.file?.filename,
        excerpt
    })
    if (post) {
        if (Array.isArray(categories)) {
            post.setCategories(categories)
        }
        if (Array.isArray(tags)) {
            post.setTags(tags)
        }
        res.send(response.successResponse(postTransformer(post), 'Post has been added'))
    } else {
        res.send(response.errorResponse('An error occurred while adding the post'))
    };
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
    };
};


//UPDATE
const update = async (req, res) => {
    const id = req.params.id;
    const title = String(req.body.title?.trim())
    const content = String(req.body.content?.trim())
    const excerpt = String(req.body.excerpt?.trim())
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
        if (excerpt) {
            post.excerpt = excerpt
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
            res.send(response.successResponse(postTransformer(post), 'Post has been updated'));
            return
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('The post is undefined'));
    };
};

const verification = async (req, res, next) => {
    const id = req.params.id
    let verified = req.body.newStatus
    if (verified != 1) { 
        verified = 0
    }
    const post = await models.Post.findByPk(id)
    if (post) {
        post.verified = verified
        post.save().then((post) => {
            res.send(response.successResponse(postTransformer(post), 'Post verification updated'))
        })
    }
}

// //VERIFIED
const verified = async (req, res, next) => {
    const postId = req.params.id;
    const isVerified = req.body.verified;
    if (isVerified === undefined) {
        res.send(response.errorResponse("verified is required in the request body"))
    };
    const isVerifiedPost = await models.Post.findByPk(postId);
    if (isVerifiedPost) {
        isVerifiedPost.verified = isVerified
        isVerifiedPost.save().then((isVerifiedPost) => {
            res.send(response.successResponse(isVerifiedPost, 'verified has been updated'))
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('verified not found'))
    }
};






module.exports = {
    index,
    index2,
    show,
    create,
    remove,
    update,
    verification
}