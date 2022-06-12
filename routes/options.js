const express = require('express');
const router = express.Router();
var optionController = require('../controllers/OptionController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const path = require('path');
const multer = require('multer');
const { isAdmin } = require('../middlewares/isAdmin');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const acceptFile = function (req, file, cb) {
    const acceptedMimType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ]
    if (acceptedMimType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: acceptFile,
    limits: { fileSize: 10485760 }
})

router.put("/", isAuthenticated, isAdmin, upload.single('logo'), optionController.update);
router.get('/', optionController.index);


module.exports = router;