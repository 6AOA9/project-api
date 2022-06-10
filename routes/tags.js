const express = require('express');
const router = express.Router();
const path = require('path');
const tagController = require('../controllers/tagController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');


// router.get('/', tagController.index);
// router.post('/', tagController.index);



module.exports = router;