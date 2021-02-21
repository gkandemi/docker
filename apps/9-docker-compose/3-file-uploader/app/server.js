const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads/`,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage }).single("photo");

app.use(cors());
app.use(express.static("dist"));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
app.get("/image/show/:imageID", (req, res) => {
  res.sendFile(path.join(__dirname + `/uploads/${req.params.imageID}`));
});

app.post("/image", uploadImage, (req, res) => {
  console.log("req.file :>> ", req.file);
  if (req.file) return res.json({ msg: "Güzeeel" });
  res.send("Image upload failed");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
