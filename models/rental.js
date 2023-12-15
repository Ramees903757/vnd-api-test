const mongoose = require("mongoose");

const RentalSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rental", RentalSchema);
