var express = require("express");
var Rental = require("../models/rental");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
    var imgArray = [];

    req.files.images.forEach(function (arrayItem) {
      imgArray.push(arrayItem.filename);
    });
    var request = {
      thumb: req.files.thumb[0].filename,
      logo: req.files.logo[0].filename,
      images: imgArray,
      location: req.body.location,
      name: req.body.name,
      description: req.body.description,
      overview: req.body.overview,
      provide: req.body.provide,
      price: req.body.price,
    };
    console.log("request", request);
    try {
      const rental = await Rental.create(request);
      console.log("success");
      res.status(200).json(rental);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const rental = await Rental.find({});
    res.status(200).json(rental);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findById(id);
    res.status(200).json(rental);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findByIdAndDelete(id);
    if (!rental) {
      return res
        .status(404)
        .json({ message: "Cannot find any rental with the same id" });
    }
    res.status(200).json(rental);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findByIdAndUpdate(id, req.body);
    if (!rental) {
      return res
        .status(404)
        .json({ message: "Cannot find any rental with the same id" });
    }
    const updatedRental = await Rental.findById(id);
    res.status(200).json(updatedRental);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
