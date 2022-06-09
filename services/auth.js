const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require("bcryptjs");

var authService = {
    signUser: function (user) {
        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
            },
            `${process.env.JWT_SECRET_KEY}`,
            {
                expiresIn: '1h'
            }
        );
        return token;
    },
    verifyUser: async function (token) {
        if (!token) {
            return false
        }
        try {
            let decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
            const user = await models.User.findByPk(decoded.id)
            if (user) {
                return user
            } else {
                return false
            }
        } catch (error) {
            return false
        }
        
    },
    isAdmin: function (user) {
        return user.role == 1
    },
    isUser: function (user) {
        return user.role == 2
    },
    hashPassword: function (plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function (plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    }
}
module.exports = authService;