const mongoose = require("mongoose")

const CertiImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const CertiImage = mongoose.model("Certi-Image", CertiImageSchema)

module.exports = CertiImage