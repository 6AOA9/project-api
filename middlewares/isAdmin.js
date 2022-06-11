const { errorResponse } = require("../services/response")

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 1) {
        return next()
    }
    res.status(403)
    res.send(errorResponse('You are not authorized'))
    return
}