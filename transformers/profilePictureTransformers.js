const { userTransformer } = require('./userTransformers')

const profilePictureTransformer = (profile) => {
    profile.profilePicture = `${process.env.URL + '' + process.env.UPLOADS + '' + profile.profilePicture}`
    if (profile.User) {
        profile.User = userTransformer(profile.User)
    }
    return profile;
}
const profilePicturesTransformer = (ArrayOfprofilePictures) => {
    return ArrayOfprofilePictures.map((singleprofilePicture) => profilePictureTransformer(singleprofilePicture))
};
module.exports = {
    profilePictureTransformer,
    profilePicturesTransformer
}