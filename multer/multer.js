// const multer= require('multer');

// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });



//   const editedStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// const addBanner = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });



//   const editBanner = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });


const multer = require('multer');

const allowedFormats = ['jpeg', 'webp', 'jpg'];

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const format = file.mimetype.split('/')[1];
        if (allowedFormats.includes(format)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only JPEG, WEBP, and JPG are allowed.'));
        }
    },
});

const editedStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const format = file.mimetype.split('/')[1];
        if (allowedFormats.includes(format)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only JPEG, WEBP, and JPG are allowed.'));
        }
    },
});

const addBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const format = file.mimetype.split('/')[1];
        if (allowedFormats.includes(format)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only JPEG, WEBP, and JPG are allowed.'));
        }
    },
});

const editBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const format = file.mimetype.split('/')[1];
        if (allowedFormats.includes(format)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only JPEG, WEBP, and JPG are allowed.'));
        }
    },
});

module.exports = {
    uploads: multer({ storage: Storage }).array('Image', 4),
    editeduploads: multer({ storage: editedStorage }).fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addBannerupload: multer({ storage: addBanner }).single('bannerimage'),
    editBannerupload: multer({ storage: editBanner }).single('bannerimage1'),
};
