var express = require('express');
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router = express.Router();



router.post('/', isAuthenticated, commentController.store);


module.exports = router;
