const mongoose = require("mongoose");
const { Schema } = mongoose;

const newitemSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
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

const newitemModel = mongoose.model("New", newitemSchema);
module.exports = newitemModel;
