const express = require("express");

const uploadImagesRouter = express.Router();
const {
  // imageFilter,
  uploadFile,
  uploadFiles,
  minifyImage,
  
} = require("../helpers/uploadMinify");
const {
  getImages,
  // imageFilter,
  uploadImage,
  uploadImages,
  deleteImageById,
} = require("./uploadImagesController");
const { asyncWrapper } = require("../helpers/asyncWrapper");

//* GET http://localhost:4001/images/photos
uploadImagesRouter.get("/photos", asyncWrapper(getImages));

//* POST http://localhost:4001/images/upload
//* в MongoDB записывает в images та в папку /images + зменшує вагу
uploadImagesRouter.post(
  "/upload",
  uploadFile,
  minifyImage,
  asyncWrapper(uploadImage)
);

//* POST http://localhost:4001/images/uploads
uploadImagesRouter.post("/uploads", uploadFiles, asyncWrapper(uploadImages));

uploadImagesRouter.delete("/:id", asyncWrapper(deleteImageById));

module.exports = uploadImagesRouter;
