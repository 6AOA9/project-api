var express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

var router = express.Router();

router.post('/', isAuthenticated, isAdmin, categoryController.store);
router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.put('/:id', isAuthenticated, isAdmin, categoryController.update)
router.delete('/:id', isAuthenticated, isAdmin, categoryController.remove);

module.exports = router;
