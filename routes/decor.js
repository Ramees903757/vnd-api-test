var express = require("express");
var Decor = require("../models/decor");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "styleImg", maxCount: 10 },
  ]),

  async (req, res) => {
    var imgArray = [];
    var styleArray = [];

    // console.log("req", req.body);
    console.log("fff", req.files);
    req.files.images.forEach(function (arrayItem) {
      imgArray.push(arrayItem.filename);
    });
    var realStyleData = JSON.parse(req.body.styles);
    realStyleData.forEach(function (arrayItem, index) {
      var data = {
        id: arrayItem.id,
        title: arrayItem.title,
        price: arrayItem.price,
        styleImg: req.files.styleImg[index].filename,
      };
      styleArray.push(data);
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
      styles: styleArray,
    };
    console.log("request", request);
    try {
      const decor = await Decor.create(request);
      console.log("success");
      res.status(200).json(decor);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const decor = await Decor.find({});
    res.status(200).json(decor);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const decor = await Decor.findById(id);
    res.status(200).json(decor);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const decor = await Decor.findByIdAndDelete(id);
    if (!decor) {
      return res
        .status(404)
        .json({ message: "Cannot find any decor with the same id" });
    }
    res.status(200).json(decor);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const decor = await Decor.findByIdAndUpdate(id, req.body);
    if (!decor) {
      return res
        .status(404)
        .json({ message: "Cannot find any decor with the same id" });
    }
    const updatedDecor = await Decor.findById(id);
    res.status(200).json(updatedDecor);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
