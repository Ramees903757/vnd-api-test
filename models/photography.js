const mongoose = require("mongoose");

const PhotographySchema = mongoose.Schema(
  {
    thumb: String,
    logo: String,
    location: String,
    name: String,
    description: String,
    overview: String,
    provide: String,
    images: Array,
    price: String,
    video: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photography", PhotographySchema);
