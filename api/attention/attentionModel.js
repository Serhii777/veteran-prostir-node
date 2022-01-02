const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttentionitemSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  text: String,
});

const AttentionitemModel = mongoose.model("Attentionitem", AttentionitemSchema);
module.exports = AttentionitemModel;
