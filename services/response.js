const successResponse = (data = [], messages = [], extras = {}) => {
    // always keep messages as an array
    var messages = Array.isArray(messages) ? messages : [messages]
    return {
        success: true,
        data,
        messages,
        ...extras
    }
}

const errorResponse = (data = [], messages = []) => {
    // always keep messages as an array
    var messages = Array.isArray(messages) ? messages : [messages]
    return {
        success: false,
        data,
        messages
    }
}

module.exports = {
    successResponse,
    errorResponse
}