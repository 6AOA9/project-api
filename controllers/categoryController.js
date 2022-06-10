const models = require('../models')
const response = require('../services/response')


//CREATE CATEGORY
const store = async (req, res, next) => {
    const title = String(req.body?.title?.trim())
    if (title != '') {
        const [category, created] = await models.Category.findOrCreate({
            where: {
                title
            }
        })
        if (created) {
            res.send(response.successResponse(category))
        } else {
            res.send(response.errorResponse('The category is already there'))
        }
        return
    }
    res.send(errorResponse('Please check the category information'))
}


//SHOW
const index = async (req, res, next) => {
    const allowedOrderBy = { date: 'createdAt', views: 'views' }
    const orderBy = (allowedOrderBy[req?.query?.orderBy]) ? allowedOrderBy[req?.query?.orderBy] : 'id'
    const category = await models.Category.findAll({
        orderBy: [orderBy, 'DESC']
    })
    res.send(response.successResponse(category))
};


//DELETE
const Update = async function (req, res, next) {
    const id = +req.params.id
    const postId = req.user.id
    const cateDelete = await models.Category.findByPk(id)
    if (cateDelete) {
        if (postId == cateDelete.id) {
            const deleted = await models.Category.update({ deletedAt: new Date() }, {
                where: {
                    id: id
                }
            });
            if (deleted) {
                res.send(response.successResponse('Category has been deleted'))
                return
            };
        };
    };
    res.send(response.errorResponse('An error occurred while deleting Category'))
}



module.exports = {
    store,
    index,
    Update
}