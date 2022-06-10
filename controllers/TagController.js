const models = require('../models');
const { isAdmin } = require('../services/auth');
const response = require('../services/response');



const getTags = async (req, res) => {
    try {
        const tags = await models.Tag.findAll({});
        if (tags) {
            return response.success(tags, res);
        } else {
            return response.failedWithMessage("failed to process your request", res)
        }
    } catch (e) {
        return response.failedWithMessage("failed to process your request", res);
    };
};





module.exports = {

}
