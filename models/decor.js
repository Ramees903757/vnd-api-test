const mongoose = require("mongoose");

const DecorSchema = mongoose.Schema(
  {
    thumb: String,
    logo: String,
    location: String,
    name: String,
    description: String,
    overview: String,
    provide: String,
    images: Array,
    styles: Array({
      id: Number,
      title: String,
      price: String,
      styleImg: String,
    }),
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Decor", DecorSchema);
