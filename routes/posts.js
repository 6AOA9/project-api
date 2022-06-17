const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const path = require('path');
const multer = require('multer');
const { isOwner } = require('../middlewares/isOwner');
const { loadUser } = require('../middlewares/loadUser');
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
});

router.get('/getWidePost/:id', postController.getWidePost);
router.get('/', loadUser, postController.index);
router.get('/:id', loadUser, postController.show);
router.post('/', isAuthenticated, upload.single('picture'), postController.create);
router.delete('/:id', isAuthenticated, isOwner('post'), postController.remove);
router.put('/:id', isAuthenticated, isOwner('post'), upload.single('picture'), postController.update);
router.put('/verified/:id', isAuthenticated, isAdmin, postController.verified);

module.exports = router;