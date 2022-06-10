const express = require('express');
const router = express.Router();
const path = require('path');
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const multer = require('multer')

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

router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/', isAuthenticated, upload.single('picture'), postController.create);
router.delete('/:id', isAuthenticated, postController.remove);
router.put('/:id', isAuthenticated, upload.single('picture'), postController.update);

module.exports = router;
