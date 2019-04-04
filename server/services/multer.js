const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'huvfCeSo0RG9Xsk0saQrz5PHedihTMo09P0PaaDd',
    accessKeyId: 'AKIAJTTJWP2J6BILHRQA',
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'sportscardsapp',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

module.exports = upload;