const mongoose = require("mongoose");
const { Schema } = mongoose;

const womenclubSchema = new Schema({
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

const womenclubModel = mongoose.model("Womenclub", womenclubSchema);
module.exports = womenclubModel;
