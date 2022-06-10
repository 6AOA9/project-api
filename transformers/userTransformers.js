const userTransformer = (user) => {
    delete user?.['dataValues']?.['password'];
    delete user?.['password'];
    return user;
}

exports.userTransformer = userTransformer;