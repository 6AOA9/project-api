const adTransformers = (ad) => {
    ad.picture = `${process.env.URL + process.env.UPLOADS + ad.picture}`
    return ad;
}
const adsTransformers = (ads) => {
    return ads.map((singleAd) => adTransformers(singleAd))
};
module.exports = {
    adTransformers,
    adsTransformers
}