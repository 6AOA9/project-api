const express = require('express');
const router = express.Router();
const path = require('path');
const tagController = require('../controllers/TagController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');


router.post('/', isAuthenticated, tagController.store);
router.get('/', tagController.index);
router.get('/:id', tagController.show);
router.put('/:id', isAuthenticated, tagController.update)
router.delete('/:id', isAuthenticated, tagController.remove);




module.exports = router;