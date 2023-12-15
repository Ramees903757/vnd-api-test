const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    newpassword: {
      type: String,
      required: true,
    },

    dob: String,
    userrole: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
