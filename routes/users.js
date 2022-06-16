var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');
const { isUser } = require('../middlewares/isUser');
const { isOwner } = require('../middlewares/isOwner');

router.get('/', userController.index);
router.get('/getUserPosts', isAuthenticated, isUser, userController.getUserPosts);
router.get('/:id', isAuthenticated, userController.show);
router.post('/', userController.signup);
router.post('/admin', isAuthenticated, isAdmin, userController.signup);
router.post('/signin', userController.signin);
router.put('/:id', isAuthenticated, isOwner('profile'), userController.update);
router.delete('/:id', isAuthenticated, isAdmin, userController.remove);

module.exports = router;