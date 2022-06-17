var express = require('express');
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

var router = express.Router();

router.post('/', isAuthenticated, commentController.store);
router.delete('/:id', isAuthenticated, isAdmin, commentController.remove);
router.get("/", isAuthenticated, commentController.index)
module.exports = router;
