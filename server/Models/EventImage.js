const mongoose = require("mongoose")

const eventImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
})

const IventImage = mongoose.model("event-image", eventImageSchema)

module.exports = IventImage