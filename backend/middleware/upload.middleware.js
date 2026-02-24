const multer = require("multer");
const path = require("path");

// 👇 Disk storage (creates file.path)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".csv")) {
      cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  }
});

module.exports = upload;