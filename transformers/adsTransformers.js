const adsTransformers = (ads) => {
    ads.adsValue = `${process.env.URL + process.env.UPLOADS + ads.adsValue}`
    return ads;
}
const adssTransformers = (ArrayOfadss) => {
    return ArrayOfadss.map((singleads) => adsTransformers(singleads))
};
module.exports = {
    adsTransformers,
    adssTransformers
}