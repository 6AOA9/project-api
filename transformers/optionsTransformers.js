exports.optionsTransformer = (options) => {
    if (options.logo) {
        options.logo = `${process.env.URL + '' + process.env.UPLOADS + '' + options.logo}`
    }
    if (options.latitude) {
        options.latitude = parseFloat(options.latitude)
    }
    if (options.longitude) {
        options.longitude = parseFloat(options.longitude)
    }
    return options
}

