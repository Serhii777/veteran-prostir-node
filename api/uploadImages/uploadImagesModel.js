const mongoose = require("mongoose");
const { Schema } = mongoose;

const uploadImagesSchema = new Schema({
  titleImage: String,
  descriptionImage: String,
  imageFilename: String,
  imagePath: String,
  imageUrl: String, //This Schema should be mentioned as a string
  imageInitialSize: String, //This Schema should be mentioned as a string
});

const uploadImagesModel = mongoose.model("Image", uploadImagesSchema);
module.exports = uploadImagesModel;
