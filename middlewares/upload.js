const multer = require('multer');
const path = require('path');

// storage location + filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// only allow images
const fileFilter = (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PNG/JPG images allowed!'), false);
};

module.exports = multer({ storage, fileFilter });
