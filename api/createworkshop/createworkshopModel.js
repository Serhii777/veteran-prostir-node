const mongoose = require("mongoose");
const { Schema } = mongoose;

const createworkshopSchema = new Schema({
  title: String,
  contentText: [
    {
      textTitle: String,
      toppings: String,
      text: String,
      image: String,
      link: String,
    },
  ],
});

const createworkshopModel = mongoose.model("Createworkshop", createworkshopSchema);
module.exports = createworkshopModel;
