var express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router = express.Router();

/* GET home page. */
router.post('/', isAuthenticated, categoryController.store);

module.exports = router;
