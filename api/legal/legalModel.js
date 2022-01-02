const mongoose = require("mongoose");
const { Schema } = mongoose;

const LegalitemSchema = new Schema({
  title: { type: String, required: true },
  contentText: [
    {
      textTitle: String,
      toppings: String,
      text: String,
      link: String,
    },
  ],
});

const LegalitemModel = mongoose.model("Legalitem", LegalitemSchema);
module.exports = LegalitemModel;
