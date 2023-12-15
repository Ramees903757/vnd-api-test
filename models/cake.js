const mongoose = require("mongoose");

const CakeSchema = mongoose.Schema(
  {
    thumb: String,
    logo: String,
    location: String,
    name: String,
    description: String,
    overview: String,
    provide: String,
    cakes: Array({
      id: Number,
      title: String,
      price: String,
      desp: String,
      cakeImage: String,
    }),
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cake", CakeSchema);
