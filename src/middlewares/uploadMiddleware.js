const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3 = require('../config/wasabi');
require('dotenv').config();

console.log("=== ENV ===");
console.log("Bucket:", process.env.WASABI_BUCKET);
console.log("AccessKey:", process.env.WASABI_ACCESS_KEY);
console.log("SecretKey:", process.env.WASABI_SECRET_KEY);

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.WASABI_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.pdf') {
        return cb(new Error('Only PDF files are allowed'));
      }
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  }),
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

module.exports = upload;
