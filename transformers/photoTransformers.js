const photoTransformers = (photo) => {
    photo.picture = `${process.env.URL + process.env.UPLOADS + photo.picture}`
    // if (photo.distance) {
    //     photo.distance = parseFloat(photo.distance.toFixed(2))
    // }
    return photo
}
const photosTransformers = (ArrayOfphotos) => {
    return ArrayOfphotos.map((singlephoto) => photoTransformers(singlephoto))
}
module.exports = {
    photoTransformers,
    photosTransformers
}