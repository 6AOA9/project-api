const response = require('../services/response');
const models = require('../models');
const { optionsTransformer } = require('../transformers/optionsTransformers')


//UPDATE
const update = async function (req, res, next) {
    const newSiteData = { ...req.body };
    const previoueSiteData = await models.Option.findOne({
        where: {
            optionKey: 'site_options'
        }
    })
    if (req?.file) {
        newSiteData.logo = req.file.filename
    }
    previoueValues = JSON.parse(previoueSiteData.optionValue)
    previoueSiteData.optionValue = JSON.stringify({
        ...previoueValues,
        ...newSiteData
    })
    previoueSiteData.save().then((updatedOptions) => {
        updatedValues = JSON.parse(updatedOptions.optionValue)
        res.send(response.successResponse(optionsTransformer(updatedValues), 'Options Updated Successfully'))
    })

}



//INDEX
const index = async (req, res, next) => {
    const option = await models.Option.findAll({
    })
    if (option) {
        res.send(response.successResponse(optionTransformers(option)))
    } else {
        res.send(response.errorResponse('An error occurred'))
    };
};

module.exports = {
    update,
    index
}