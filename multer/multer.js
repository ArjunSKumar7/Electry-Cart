const multer= require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});



  const editedStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const addBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});



  const editBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


module.exports={
    
    
    uploads:multer({storage:Storage}).array('Image',4),
    editeduploads:multer({storage:editedStorage}).fields([
        {name:'image1',maxCount:1},
        {name:'image2',maxCount:1},
        {name:'image3',maxCount:1},
        {name:'image4',maxCount:1}
    ]),

    addBannerupload:multer({storage:addBanner}).single('bannerimage'),
    editBannerupload:multer({storage:editBanner}).single('bannerimage1'),

}
  
// const multer= require('multer');
// const { v4: uuidv4 } = require('uuid');

// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         const uniqueFilename = `${Date.now()}-${uuidv4()}-${file.originalname}`;
//         cb(null, uniqueFilename);
//     }
// });

// const editedStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         const uniqueFilename = `${Date.now()}-${uuidv4()}-${file.originalname}`;
//         cb(null, uniqueFilename);
//     }
// });

// module.exports = {
//     uploads: multer({ storage: Storage }).array('files'),
//     editeduploads: multer({ storage: editedStorage }).array('editedFiles')
// }




