const mongoose = require("mongoose")

const GalleryImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
})

const GalleryImage = mongoose.model("Gallery-Image", GalleryImageSchema)

module.exports = GalleryImage