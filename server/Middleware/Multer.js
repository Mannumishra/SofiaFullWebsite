const multer = require('multer')
const fs = require("fs")

const dir = './Public';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 30 * 1024 * 1024 } // Limit to 10MB
})

module.exports = upload