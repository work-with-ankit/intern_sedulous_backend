const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'profileImage',
        allowed_formats: ['jpg','png', 'jpeg'],
        transforamtion: [{width: 500, height: 500, crop: 'limit'}],

    },


});

    const upload = multer({storage});

    const uploadimageMiddleware = async( req, res, next)=>{
        req.imageUrl = req.file.path;
        req.publicId= req.file.filename;
        next();
    };

    module.exports= uploadimageMiddleware;