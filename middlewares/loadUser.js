const authService = require('../services/auth');

exports.loadUser = async function (req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1]
    var loggedUser = await authService.verifyUser(token);
    if (loggedUser) {
        req.user = loggedUser
    }
    return next()
}