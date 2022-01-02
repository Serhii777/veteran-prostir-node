const mongoose = require("mongoose");
const { Schema } = mongoose;

const announcementSchema = new Schema({
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

const announcementModel = mongoose.model("Announcement", announcementSchema);
module.exports = announcementModel;
