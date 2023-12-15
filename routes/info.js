var express = require("express");
var Info = require("../models/info");
var router = express.Router();
router.post("/", async (req, res) => {
    console.log("req", req.body);
    try {
        const info = await Info.create(req.body);
        console.log("success");
        res.status(200).json(info);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const info = await Info.find({});
        res.status(200).json(info);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const info = await Info.findById(id);
        res.status(200).json(info);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const info = await Info.findByIdAndDelete(id);
        if (!info) {
            return res
                .status(404)
                .json({ message: "Cannot find any info with the same id" });
        }
        res.status(200).json(info);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const info = await Info.findByIdAndUpdate(id, req.body);
        if (!info) {
            return res
                .status(404)
                .json({ message: "Cannot find any info with the same id" });
        }
        const updatedInfo = await Info.findById(id);
        res.status(200).json(updatedInfo);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
