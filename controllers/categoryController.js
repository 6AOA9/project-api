const models = require('../models')
const response = require('../services/response')

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

module.exports = {
    store
}