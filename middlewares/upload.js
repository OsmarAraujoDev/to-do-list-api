const multer = require('multer');
const path = require('path');
const fs = require('fs');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toASCIIBase(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function sanitizeFilename(name) {
  const ascii = toASCIIBase(name);
  return ascii.replace(/[^a-zA-Z0-9.\-_ ]/g, "").trim();
}

function uniqueName(originalname) {
  const ts = Date.now();
  const ext = path.extname(originalname);
  const base = path.basename(originalname, ext);
  const cleanBase = sanitizeFilename(base);
  return `${ts}_${cleanBase}${ext}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const subdir = path.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, "0"));
    const dest = path.join('uploads/', subdir);
    try {
      ensureDirSync(dest);
      cb(null, dest);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, uniqueName(file.originalname));
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage });

module.exports = upload;