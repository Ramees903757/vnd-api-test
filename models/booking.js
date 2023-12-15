const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    userInfo: {
      event: String,
      date: String,
      venue: String,
      totalPeople: String,
      name: String,
      mobile: String,
      email: String,
      address: String,
    },
    cartData: {
      totalAmount: String,
      catering: {
        title: String,
        price: String,
      },
      decor: {
        title: String,
        price: String,
      },
      photography: {
        title: String,
        price: String,
      },
      transpotation: {
        title: String,
        price: String,
      },
      music: {
        title: String,
        price: String,
      },
      cakes: {
        title: String,
        price: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
