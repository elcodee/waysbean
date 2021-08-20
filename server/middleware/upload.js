const multer = require("multer");

exports.uploadImg = (photo, attachment) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      switch (file.fieldname) {
        case "photo":
          cb(null, "uploads/beans"); //Lokasi penyimpanan file Picture's
        case "attachment":
          cb(null, "uploads/proof"); //Lokasi penyimpanan file Proof
          break;
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(/\s/g, ""));
    },
  });

  // Function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (file.fieldname === photo && file.fieldname === attachment) {
      if (
        !file.originalname.match(/\.(svg|jpg|JPG|jpeg|JPEG|png|PNG|git|GIF)$/)
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 5;
  const maxSize = sizeInMb * 1000 * 1000; //5Mb

  // Eksekusi upload multer dan menentukan disk storage, validation dan maxSize file
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: photo,
      maxCount: 1,
    },
    {
      name: attachment,
      maxCount: 1,
    },
  ]); //Menentukan jumlah file

  return (req, res, next) => {
    upload(req, res, function (err) {
      // Pesan error jika validasi gagal
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      // Jika file upload tidak ada
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload",
        });
      }

      if (err) {
        // Jika size melebihi batas
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10Mb",
          });
        }
        console.log("EEEERRRRR: ", err);
        return res.status(400).send({
          message: "Failed Upload",
          status: err,
        });
      }
      return next();
    });
  };
};
