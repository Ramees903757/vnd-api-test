var express = require("express");
var Cake = require("../models/cake");
var router = express.Router();
const { uploadHandler } = require("../utils/multer-config");
router.post(
  "/",
  uploadHandler.fields([
    { name: "thumb", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "cakeImages", maxCount: 10 },
  ]),
  async (req, res) => {
    var cakeArray = [];
    console.log("req", req.body);
    console.log("fff", req.files);
    var realCakeData = JSON.parse(req.body.cakes);
    realCakeData.forEach(function (arrayItem, index) {
      var data = {
        id: arrayItem.id,
        title: arrayItem.title,
        price: arrayItem.price,
        desp: arrayItem.desp,
        cakeImage: req.files.cakeImages[index].filename,
      };
      cakeArray.push(data);
    });
    var request = {
      thumb: req.files.thumb[0].filename,
      logo: req.files.logo[0].filename,
      location: req.body.location,
      name: req.body.name,
      description: req.body.description,
      overview: req.body.overview,
      provide: req.body.provide,
      cakes: cakeArray,
    };
    console.log("request", request);
    try {
      const cake = await Cake.create(request);
      console.log("success");
      res.status(200).json(cake);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const cake = await Cake.find({});
    res.status(200).json(cake);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cake = await Cake.findById(id);
    res.status(200).json(cake);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cake = await Cake.findByIdAndDelete(id);
    if (!cake) {
      return res
        .status(404)
        .json({ message: "Cannot find any cake with the same id" });
    }
    res.status(200).json(cake);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cake = await Cake.findByIdAndUpdate(id, req.body);
    if (!cake) {
      return res
        .status(404)
        .json({ message: "Cannot find any cake with the same id" });
    }
    const updatedCake = await Cake.findById(id);
    res.status(200).json(updatedCake);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
