const mongoose = require("mongoose");
const { Schema } = mongoose;

const rehabilitationSchema = new Schema({
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

const rehabilitationModel = mongoose.model("Rehabilitation", rehabilitationSchema);
module.exports = rehabilitationModel;
