const userTransformer = (user) => {
    delete user?.['dataValues']?.['password'];
    delete user?.['password'];
    return user;
}

const usersTransformer = (ArrayOfposts) => {
    return ArrayOfposts.map((singlepost) => userTransformer(singlepost))
};
module.exports = {
    userTransformer,
    usersTransformer
}