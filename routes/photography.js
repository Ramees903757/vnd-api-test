var express = require("express");
var Photography = require("../models/photography");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
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
      logo: req.files.logo[0].filename,
      video: req.files.logo[0].filename,
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
      const photography = await Photography.create(request);
      console.log("success");
      res.status(200).json(photography);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const photography = await Photography.find({});
    res.status(200).json(photography);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const photography = await Photography.findById(id);
    res.status(200).json(photography);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const photography = await Photography.findByIdAndDelete(id);
    if (!photography) {
      return res
        .status(404)
        .json({ message: "Cannot find any photography with the same id" });
    }
    res.status(200).json(photography);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const photography = await Photography.findByIdAndUpdate(id, req.body);
    if (!photography) {
      return res
        .status(404)
        .json({ message: "Cannot find any photography with the same id" });
    }
    const updatedPhotography = await Photography.findById(id);
    res.status(200).json(updatedPhotography);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
