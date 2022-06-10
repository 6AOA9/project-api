const models = require('../models');
const { isAdmin } = require('../services/auth');
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





//SHOW
const index = async (req, res) => {
    const tags = await models.Tag.findAll({
        orderBy: ['title', 'ASC']
    })
    if (tags) {
        res.send(response.successResponse(tags))
    } else {
        res.send(response.errorResponse('Please try again later'))
    }
};


//UPDATE TAG
const update = async function (req, res, next) {
    const id = +req.params.id
    const tagId = req.user.id
    const tagDelete = await models.Tag.findByPk(id)
    if (tagDelete) {
        if (tagId == tagDelete.id) {
            const deleted = await models.Tag.update({ deletedAt: new Date() }, {
                where: {
                    id: id
                }
            });
            if (deleted) {
                res.send(response.successResponse('Tag has been deleted'))
                return
            };
        };
    };
    res.send(response.errorResponse('An error occurred while deleting Tag'))
};



module.exports = {
    index,
    store,
    update
}
