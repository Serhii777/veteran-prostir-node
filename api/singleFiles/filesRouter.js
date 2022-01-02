const express = require("express");

const filesRouter = express.Router();

const {
  imageFilter,
  uploadedFile,
  uploadedFiles,
  minifyImage,
} = require("../helpers/uploadMinify");

const {
  uploadController,
  uploadControllerFiles,
  getListFiles,
  download,
} = require("./filesController");

//* http://localhost:4001/files/upload
filesRouter.post("/upload", uploadController);

//* http://localhost:4001/files/uploads
filesRouter.post("/uploads", uploadControllerFiles);

filesRouter.get("/files", getListFiles);

filesRouter.get("/files/:name", download);

module.exports = filesRouter;
