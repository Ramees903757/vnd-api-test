var express = require("express");
var Transportation = require("../models/transportation");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    // { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
    var imgArray = [];
    console.log("req", req.body);
    console.log("fff", req.files);
    req.files.images.forEach(function (arrayItem) {
      imgArray.push(arrayItem.filename);
    });
    var request = {
      thumb: req.files.thumb[0].filename,
      // logo: req.files.logo[0].filename,
      images: imgArray,
      // location: req.body.location,
      name: req.body.name,
      description: req.body.description,
      overview: req.body.overview,
      provide: req.body.provide,
      price: req.body.price,
      type: req.body.type,
      noOfSeats: req.body.noOfSeats,
    };
    console.log("request", request);
    try {
      const transportation = await Transportation.create(request);
      console.log("success");
      res.status(200).json(transportation);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const transportation = await Transportation.find({});
    res.status(200).json(transportation);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transportation = await Transportation.findById(id);
    res.status(200).json(transportation);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transportation = await Transportation.findByIdAndDelete(id);
    if (!transportation) {
      return res
        .status(404)
        .json({ message: "Cannot find any transportation with the same id" });
    }
    res.status(200).json(transportation);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transportation = await Transportation.findByIdAndUpdate(id, req.body);
    if (!transportation) {
      return res
        .status(404)
        .json({ message: "Cannot find any transportation with the same id" });
    }
    const updatedTransportation = await Transportation.findById(id);
    res.status(200).json(updatedTransportation);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
