const optionTransformers = (option) => {
    option.optionValue = `${process.env.URL + process.env.UPLOADS + option.optionValue}`
    return option;
}
const optionsTransformers = (ArrayOfoptions) => {
    return ArrayOfoptions.map((singleoption) => optionTransformers(singleoption))
};
module.exports = {
    optionTransformers,
    optionsTransformers
}