var express = require('express');
var router = express.Router();
const PostController = require('../controllers/PostController')

router.get('/', PostController.index);
router.post('/', PostController.create);

module.exports = router;
