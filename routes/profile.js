var express = require("express");
var Profile = require("../models/profile");
var router = express.Router();
router.post("/", async (req, res) => {
    console.log("req", req.body);
    try {
        const profile = await Profile.create(req.body);
        console.log("success");
        res.status(200).json(profile);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const profile = await Profile.find({});
        res.status(200).json(profile);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);
        res.status(200).json(profile);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return res
                .status(404)
                .json({ message: "Cannot find any profile with the same id" });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByIdAndUpdate(id, req.body);
        if (!profile) {
            return res
                .status(404)
                .json({ message: "Cannot find any profile with the same id" });
        }
        const updatedProfile = await Profile.findById(id);
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
