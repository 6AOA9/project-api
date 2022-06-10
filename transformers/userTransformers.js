// const userTransformers = (user) => {
//     user.profilePic = `${process.env.URL + process.env.UPLOADS + user.profilePic}`
//     return user;
// }
// const usersTransformers = (ArrayOfusers) => {
//     return ArrayOfusers.map((singleuser) => userTransformers(singleuser))
// };
// module.exports = {
//     userTransformers,
//     usersTransformers
// }

const userTransformer = (user) => {
    delete user['dataValues']['password'];
    return user;
}

exports.userTransformer = userTransformer;