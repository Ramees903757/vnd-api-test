const mongoose = require("mongoose");

const InfoSchema = mongoose.Schema(
    {
        svcCharge: Number,
        phoneNo: String,
        email: String,
        address: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Info", InfoSchema);
