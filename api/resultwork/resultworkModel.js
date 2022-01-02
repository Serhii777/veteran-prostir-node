const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const resultworkitemsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  contentText: [
    {
      textTitle: String,
      toppings: String,
      text: String,
      image: String,
      imageName: String,
      imageDescription: String,
      link: String,
    },
    { timestamps: true },
  ],
});

// resultworkitemsSchema.method("toJSON", function() {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

resultworkitemsSchema.plugin(mongoosePaginate);

const resultworkitemsModel = mongoose.model(
  "Resultworkitem",
  resultworkitemsSchema
);
module.exports = resultworkitemsModel;
