const express = require('express');
const router = express.Router();
const path = require('path');
const tagController = require('../controllers/tagController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');


router.post('/', isAuthenticated, tagController.store);
router.get('/', tagController.index);
router.delete('/:id', isAuthenticated, tagController.update);



module.exports = router;