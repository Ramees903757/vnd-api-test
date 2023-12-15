const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: String,
    dob: String,
    userrole: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
