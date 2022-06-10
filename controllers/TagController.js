const models = require('../models');
const response = require('../services/response');


//CREATE TAG
const store = async (req, res, next) => {
    const title = String(req.body?.title?.trim())
    if (title != '') {
        const [Tag, created] = await models.Tag.findOrCreate({
            where: {
                title
            }
        })
        if (created) {
            res.send(response.successResponse(Tag))
        } else {
            res.send(response.errorResponse('The Tag is already there'))
        }
        return
    }
    res.send(errorResponse('Please check the Tag information'))
};





//INDEX
const index = async (req, res) => {
    const tags = await models.Tag.findAll({
        orderBy: ['title', 'ASC']
    })
    if (tags) {
        res.send(response.successResponse(tags))
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
};


//SHOW BY ID
const show = async (req, res, next) => {
    const id = +req.params.id
    const tag = await models.Tag.findOne({
        where: {
            id
        }
    })
    if (tag) {
        res.send(response.successResponse(tag))
    } else {
        res.status(404)
        res.send(response.errorResponse('Tag not found'))
    }
};



//UPDATE
const update = async (req, res, next) => {
    const id = +req.params.id
    const title = req.body.title
    const tag = await models.Tag.findByPk(id)
    if (tag) {
        tag.title = title
        tag.save().then((tag) => {
            res.send(response.successResponse(tag, 'tag has been updated'))
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('Categoy not found'))
    }
}


//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Tag.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'Tag has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting Tag'))
    };
};

module.exports = {
    store,
    index,
    show,
    update,
    remove
}
