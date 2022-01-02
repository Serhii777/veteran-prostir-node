const mongoose = require("mongoose");
const { Schema } = mongoose;

const socioadvicesSchema = new Schema({
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

const socioadvicesModel = mongoose.model("socioadvice", socioadvicesSchema);
module.exports = socioadvicesModel;
