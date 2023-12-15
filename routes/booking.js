var express = require("express");
var Booking = require("../models/booking");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post("/", async (req, res) => {
  console.log("req", req.body);
  try {
    const booking = await Booking.create(req.body);
    console.log("success");
    res.status(200).json(booking);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const booking = await Booking.find({});
    res.status(200).json(booking);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    res.status(200).json(booking);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
