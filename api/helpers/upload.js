const path = require("path");
const fsPromises = require("fs").promises;

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
    cb(null, path.resolve("./public/files/"));
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
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Для обмеження ваги картинок (3 Mb)
const maxSize = 3 * 1024 * 1024;

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFiles = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).array("multi-files", 10);

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadFilesMiddleware = util.promisify(uploadFiles);

// Для зжимання картинок
const minifyImage = async (req, res, next) => {
  try {
    const { filename, path: tmpPath } = req.file;

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
          plugins: extendDefaultPlugins([
            { name: "removeViewBox", active: false },
          ]),
        }),
      ],
    });

    await fsPromises.unlink(tmpPath);

    req.file = {
      ...req.file,
      photoURL: path.join(MINIFY_DIR, filename).replace(/\\/g, "/"),
      destination: MINIFY_DIR,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFileMiddleware,
  uploadFilesMiddleware,
  minifyImage,
};
