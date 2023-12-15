const multer = require("multer");

const audiobookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if (file.fieldname === "thumb") {
    //   cb(null, "../src/images/thumb/");
    // } else if (file.fieldname === "logo") {
    //   cb(null, "../src/images/logo/");
    // } else if (file.fieldname === "images") {
    //   cb(null, "../src/images/images/");
    // }
    cb(null, "./../event-management-service/public/dbImage");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + file.originalname);
  },
});

const audiobookFilter = (req, file, cb) => {
  if (
    file.mimetype == "audio/mp4a-latm" ||
    file.mimetype == "audio/mpeg" ||
    file.mimetype == "application/zip" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.uploadHandler = multer({
  storage: audiobookStorage,
  fileFilter: audiobookFilter,
});
