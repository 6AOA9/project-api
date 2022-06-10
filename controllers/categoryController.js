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


//INDEX
const index = async (req, res, next) => {
    const categories = await models.Category.findAll({
        orderBy: ['title', 'ASC']
    })
    if (categories) {
        res.send(response.successResponse(categories))
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
};


//SHOW BY ID
const show = async (req, res, next) => {
    const id = +req.params.id
    const category = await models.Category.findOne({
        where: {
            id
        }
    })
    if (category) {
        res.send(response.successResponse(category))
    } else {
        res.status(404)
        res.send(response.errorResponse('Category not found'))
    }
};


//UPDATE
const update = async (req, res, next) => {
    const id = +req.params.id
    const title = req.body.title
    const category = await models.Category.findByPk(id)
    if (category) {
        category.title = title
        category.save().then((category) => {
            res.send(response.successResponse(category, 'Category has been updated'))
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('Categoy not found'))
    }
}

//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Category.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'Category has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting Category'))
    };
};



module.exports = {
    store,
    show,
    index,
    remove,
    update
}