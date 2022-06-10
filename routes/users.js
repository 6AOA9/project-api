var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.post('/', userController.signup);
router.post('/admin', isAuthenticated, userController.signup);
router.post('/signin', userController.signin)

module.exports = router;
