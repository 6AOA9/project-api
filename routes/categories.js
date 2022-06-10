var express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router = express.Router();



router.post('/', isAuthenticated, categoryController.store);
router.get('/', categoryController.index);
router.delete('/:id', isAuthenticated, categoryController.Update);



module.exports = router;
