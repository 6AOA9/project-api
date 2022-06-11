const response = require('../services/response');
const models = require('../models');
const { isAdmin, isUser, signUser } = require('../services/auth');
const { optionTransformers, optionsTransformers } = require('../transformers/optionTransformers')


//ADD OPTIONS
// const store = async function (req, res, next) {
//     const option = await models.Option.create({
//         optionKey: req.body.optionKey,
//         optionValue: req?.file?.filename,
//     });
//     if (option) {
//         res.send(response.successResponse(optionTransformers("Options been created!!")));
//         return
//     }
//     else {
//         res.send(response.errorResponse('Options Not created!!!'))
//         return
//     };
// };

//UPDATE
const update = async function (req, res, next) {
    const optionKey = req.body.optionKey;
    const option = await models.Option.update();
    if (option) {
        if (optionKey) {
            option.optionKey = optionKey
        };
        if (req.file) {
            fs.unlink('uploads/' + option.optionValue, () => { })
            option.optionValue = req.file?.filename
        }
        option.save().then((option) => {
            res.send(response.successResponse(optionTransformers(option)));
            return
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('The option is undefined'));
    };
}


//INDEX
const index = async (req, res, next) => {
    const option = await models.Option.findAll({
    })
    if (option) {
        res.send(response.successResponse(postsTransformer(option)))
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
};

module.exports = {
    // store,
    update,
    index
}