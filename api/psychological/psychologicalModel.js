const mongoose = require("mongoose");
const { Schema } = mongoose;

const psychologicalitemsSchema = new Schema({
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

const psychologicalitemsModel = mongoose.model("Psychologicalitem", psychologicalitemsSchema);
module.exports = psychologicalitemsModel;
