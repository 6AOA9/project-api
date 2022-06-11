const models = require('../models')
const { isAdmin } = require('../services/auth')
const response = require('../services/response')
const { validateEmail, validatePassword } = require('../services/validation')
const authService = require('../services/auth')
const fs = require('fs')
const { profilePictureTransformer } = require('../transformers/profilePictureTransformers');
const { userTransformer, usersTransformer } = require('../transformers/userTransformers');

//INDEX
const index = async (req, res, next) => {
    const user = await models.User.findAll({
        orderBy: ['name', 'ASC']
    })
    if (user) {
        res.send(response.successResponse(usersTransformer(user)))
    } else {
        res.send(response.errorResponse('An error occurred'))
    }
};


//SHOW
const show = async (req, res, next) => {
    const id = +req.params.id
    const user = await models.User.findOne({
        where: {
            id
        }
    })
    if (user) {
        res.send(response.successResponse(userTransformer(user)))
    } else {
        res.status(404)
        res.send(response.errorResponse('user not found'))
    }
};

//REGISTER
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
    });
    if (created) {
        res.send(response.successResponse(userTransformer(user, 'User created successfully')))
    } else {
        res.send(response.errorResponse('User is already registered'))
    }
}


//SIGNIN
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
    };
};


//UPDATE
const update = async (req, res) => {
    const id = req.params.id;
    const name = String(req.body.name?.trim())
    const email = String(req.body.email?.trim())
    const password = String(req.body.password?.trim())

    const user = await models.User.findByPk(id);
    if (user) {
        if (name) {
            user.name = name

        };
        if (email) {
            user.email = email

        };
        if (password) {
            user.password = password

        };
        if (req.file) {
            fs.unlink('uploads/' + user.profilePicture, () => { })
            user.profilePicture = req.file?.filename
        }
        user.save().then((user) => {
            res.send(response.successResponse(profilePictureTransformer, userTransformer(user)));
            return
        })
    } else {
        res.status(404)
        res.send(response.errorResponse('The user is undefined'));
    };
};



//DELETE
const remove = async function (req, res, next) {
    const id = +req.params.id
    const deleted = await models.User.destroy({
        where: {
            id
        }
    });
    if (deleted) {
        res.send(response.successResponse(null, 'User has been deleted'))
    } else {
        res.send(response.errorResponse('An error occurred while deleting User'))
    };
};

module.exports = {
    signup,
    signin,
    update,
    index,
    show,
    remove
}