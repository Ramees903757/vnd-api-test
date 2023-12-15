const mongoose = require("mongoose");

const CateringSchema = mongoose.Schema(
  {
    thumb: String,
    logo: String,
    location: String,
    name: String,
    description: String,
    overview: String,
    provide: String,
    images: Array,
    menuImages: Array,
    // menu: Array,
    menu: Array({
      id: Number,
      title: String,
      price: String,
      welcomeDrinks: Array,
      firstCourse: Array,
      mainCourse: Array,
    }),
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catering", CateringSchema);
