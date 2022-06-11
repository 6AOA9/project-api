var express = require('express');
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

var router = express.Router();



router.post('/', isAuthenticated, commentController.store);
router.delete('/:id', isAuthenticated, commentController.remove);


module.exports = router;
