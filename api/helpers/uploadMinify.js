// import imagemin from 'imagemin';
const path = require("path");
const fsPromises = require("fs").promises;
// const { promises: fsPromises } = require("fs");

const multer = require("multer");
const util = require("util");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const { extendDefaultPlugins } = require("svgo");
// const { v4: uuidv4 } = require("uuid");
// global.__basedir = __dirname;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("_")
      .slice(0, -4);
    const ext = path.parse(file.originalname).ext;
    cb(null, `${name}-${Date.now()}` + ext);
  },
});

// Фільтр Для вибору доступного формату картинки
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("File format should be PNG, JPG or JPEG!"), false);
  }
};

// Для обмеження ваги картинок (4 Mb)
const maxSize = 4 * 1024 * 1024;

const uploadFile = multer({
  storage: storage,
  imageFilter: imageFilter,
  imageFilter,
  limits: { fileSize: maxSize },
}).single("image");

const uploadFiles = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array("images", 10);

// Для зжимання картинок
const minifyImage = async (req, res, next) => {
  try {
    const { filename, path: tmpPath } = req.file;

    console.log("req.file111111: ", req.file);
    console.log("filename111111: ", filename);
    console.log("tmpPath111111: ", tmpPath);

    const MINIFY_DIR = "public/images";

    await imagemin([tmpPath.replace(/\\/g, "/")], {
      destination: MINIFY_DIR,
      plugins: [
        imageminMozjpeg({
          quality: 70,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
        imageminSvgo({
          // plugins: extendDefaultPlugins([
          //   { name: "removeViewBox", active: false },
          // ]),
          plugins: [
            "preset-default",
            // or
            {
              name: "preset-default",
              floatPrecision: 4,
              overrides: {
                convertPathData: {
                  applyTransforms: false,
                },
              },
            },
          ],
        }),
      ],
    });

    await fsPromises.unlink(tmpPath);

    req.file = {
      ...req.file,
      photoURL: path.join(MINIFY_DIR, filename).replace(/\\/g, "/"),
      destination: MINIFY_DIR,
    };

    console.log("req.file222222: ", req.file);

    next();
  } catch (error) {
    next(error);
    console.log("error: ", error);
  }
};

module.exports = {
  imageFilter,
  uploadFile,
  uploadFiles,
  minifyImage,
};
