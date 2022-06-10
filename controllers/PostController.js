const models = require('../models');
const { isAdmin } = require('../services/auth');
const response = require('../services/response')

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

const show = (req, res, next) => {

}
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
}

module.exports = {
    index,
    show,
    create
}