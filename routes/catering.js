var express = require("express");
var Catering = require("../models/catering");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "menuImages", maxCount: 10 },
  ]),

  async (req, res) => {
    var imgArray = [];
    var menuImgArray = [];

    console.log("req", req.body);
    console.log("fff", req.files);
    req.files.images.forEach(function (arrayItem) {
      imgArray.push(arrayItem.filename);
    });
    req.files.menuImages.forEach(function (arrayItem) {
      menuImgArray.push(arrayItem.filename);
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
      menuImages: menuImgArray,
      menu: JSON.parse(req.body.menu),
    };
    console.log("request", request);
    try {
      const catering = await Catering.create(request);
      console.log("success");
      res.status(200).json(catering);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const catering = await Catering.find({});
    res.status(200).json(catering);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const catering = await Catering.findById(id);
    res.status(200).json(catering);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const catering = await Catering.findByIdAndDelete(id);
    if (!catering) {
      return res
        .status(404)
        .json({ message: "Cannot find any catering with the same id" });
    }
    res.status(200).json(catering);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const catering = await Catering.findByIdAndUpdate(id, req.body);
    if (!catering) {
      return res
        .status(404)
        .json({ message: "Cannot find any catering with the same id" });
    }
    const updatedCatering = await Catering.findById(id);
    res.status(200).json(updatedCatering);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
