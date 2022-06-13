const moment = require('moment')

const userTransformer = (user) => {
    delete user?.['dataValues']?.['password'];
    delete user?.['password'];
    if (user.createdAt) {
        user.dataValues.createdAt = moment(user.createdAt).fromNow();
    }
    if (user.updatedAt) {
        user.dataValues.updatedAt = moment(user.updatedAt).fromNow();
    }
    return user;
}

const usersTransformer = (users) => {
    return users.map((user) => userTransformer(user))
};
module.exports = {
    userTransformer,
    usersTransformer
}