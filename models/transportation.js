const mongoose = require("mongoose");

const TransportationSchema = mongoose.Schema(
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
    type: String,
    noOfSeats: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transportation", TransportationSchema);
