const models = require('../models')
const { isAdmin } = require('../services/auth')
const response = require('../services/response')
const {validateEmail, validatePassword} = require('../services/validation')
const authService = require('../services/auth')

const signup = async (req, res, next) => {
    const name = String(req.body.name?.trim())
    const email = String(req.body.email?.trim())
    const password = String(req.body.password?.trim())
    const role = req.body?.role
    if (name == '') {
        res.send(response.errorResponse('Please fill your name'))
        return
    }
    if (!validateEmail(email)) {
        res.send(response.errorResponse('Your email is invalid'))
        return
    }
    if (!validatePassword(password)) {
        res.send(response.errorResponse('Your password should be 6 characters at least'))
        return
    }
    
    const [user, created] = await models.User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name,
            password: authService.hashPassword(password),
            role: isAdmin(req.user) ? role : 2
        }
    })
    if (created) {
        res.send(response.successResponse(user, 'User created successfully'))
    } else {
        res.send(response.errorResponse('User is already registered'))
    }
}

const signin = async (req, res, next) => {
    const email = req.body.email?.trim()
    const password = req.body.password?.trim()
    const user = await models.User.findOne({
        where: {
            email
        }
    })
    if (user) {
        if (authService.comparePasswords(password, user.password)) {
            res.send(response.successResponse(user, null, {
                token: authService.signUser(user)
            }))
        } else {
            res.send(response.errorResponse('Your password is invalid'))
        }
    } else {
        res.send(response.errorResponse('This user is invalid'))
    }
}

module.exports = {
    signup,
    signin
}