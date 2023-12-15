const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "*",
  })
);

const mongoUrl = process.env.MONGODB_URI;
const port = process.env.PORT;

const cake = require("./routes/cake");
const catering = require("./routes/catering");
const decor = require("./routes/decor");
const music = require("./routes/music");
const photography = require("./routes/photography");
const transportation = require("./routes/transportation");
const booking = require("./routes/booking");
const rental = require("./routes/rental");
const admin = require("./routes/admin");
const info = require("./routes/info");

app.use("/cake", cake);
app.use("/catering", catering);
app.use("/decor", decor);
app.use("/music", music);
app.use("/photography", photography);
app.use("/transportation", transportation);
app.use("/booking", booking);
app.use("/rental", rental);
app.use("/admin", admin);
app.use("/info", info);

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongoDb!");
    app.listen(port, () => {
      console.log(`node api app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error", console.log(error));
  });
