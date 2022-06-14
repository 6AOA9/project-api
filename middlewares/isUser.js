const { errorResponse } = require("../services/response")

exports.isUser = (req, res, next) => {
    if (req.user.role == '2') {
        return next()
    }
    res.status(403)
    res.send(errorResponse('You are not authorized'))
}