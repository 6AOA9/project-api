var express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
var router = express.Router();



router.post('/', isAuthenticated, categoryController.store);
router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.put('/:id', isAuthenticated, categoryController.update)
router.delete('/:id', isAuthenticated, categoryController.remove);



module.exports = router;
