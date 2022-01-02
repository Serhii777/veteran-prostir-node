const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeitemsSchema = new Schema({
  title: { type: String, required: true },
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

const homeitemsModel = mongoose.model("Homeitem", homeitemsSchema);
module.exports = homeitemsModel;
