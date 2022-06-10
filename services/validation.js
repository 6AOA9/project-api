const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
const validatePassword = (password) => {
    return password.length >= 6
}

module.exports = {
    validateEmail,
    validatePassword
}