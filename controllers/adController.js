const response = require('../services/response');
const models = require('../models');
const { postsTransformer } = require('../transformers/postTransformers');

//POST
const store = async (req, res, next) => {
    const url = String(req.body.url?.trim())
    if (url == '') {
        res.send(response.errorResponse('Please add a url'))
        return
    };
    const ad = await models.Ad.create({
        url,
        picture: req.file?.filename,
    })
    res.send(response.successResponse((postsTransformer), 'Ad added seccessfully'))
};


// INDEX
const index = async (req, res) => {
    const ads = await models.Ad.findAll({
    })
    if (ads) {
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
    res.send(response.successResponse(postsTransformer(ads)))
};


//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.Ad.destroy({
        where: {
            id,
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'Ad has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting Ad'))
    };
};

module.exports = {
    store,
    index,
    remove
}