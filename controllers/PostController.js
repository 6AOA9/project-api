const models = require('../models');
const response = require('../services/response')

const index = async (req, res, next) => {
    const allowedOrderBy = {date: 'createdAt', views: 'views'}
    const orderBy = (allowedOrderBy[req?.query?.orderBy]) ? allowedOrderBy[req?.query?.orderBy] : 'id'
    const posts = await models.Post.findAll({
        include: [
            models.User
        ],
        orderBy: [orderBy, 'DESC']
    })
    res.send(response.successResponse(posts))
}
const show = (req, res, next) => {
    
}
const create = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    
}

module.exports = {
    index,
    show,
    create
}