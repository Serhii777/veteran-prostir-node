const mongoose = require("mongoose");
const { Schema } = mongoose;

const legalaiditemsSchema = new Schema({
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

const legalaiditemsModel = mongoose.model("legalaiditem", legalaiditemsSchema);
module.exports = legalaiditemsModel;
