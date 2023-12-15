var express = require("express");
var bcrypt = require("bcryptjs");
var fs = require("fs");
var Admin = require("../models/admin");
const { uploadHandler } = require("../utils/multer-config");
var router = express.Router();
router.post(
  "/",
  uploadHandler.fields([{ name: "image", maxCount: 10 }]),
  async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      var request = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        dob: req.body.dob,
        userrole: req.body.userrole,
        image: req.files.image[0].filename,
      };
      const admin = await Admin.create(request);
      console.log("success");
      res.status(200).json(admin);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json(admin);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await Admin.find({ email: email });
    res.status(200).json(admin);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Cannot find any admin with the same id" });
    }
    fs.unlinkSync("./../event-management-service/public/dbImage", admin.image);
    res.status(200).json(admin);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
});
router.put(
  "/:id",
  uploadHandler.fields([{ name: "image", maxCount: 10 }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const oldAdmin = await Admin.findById(id);
      const passwordsMatch = await bcrypt.compare(
        req.body.password,
        oldAdmin.password
      );
      if (!passwordsMatch) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      var request = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        dob: req.body.dob,
        userrole: req.body.userrole,
        image:
          req.files.image !== undefined
            ? req.files.image[0].filename
            : req.body.image,
      };
      const admin = await Admin.findByIdAndUpdate(id, request);
      if (req.files.image !== undefined)
        fs.unlinkSync(
          `./../event-management-service/public/dbImage/${oldAdmin.image}`
        );
      if (!admin) {
        return res
          .status(404)
          .json({ message: "Cannot find any admin with the same id" });
      }
      const updatedAdmin = await Admin.findById(id);
      res.status(200).json(updatedAdmin);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);
module.exports = router;
