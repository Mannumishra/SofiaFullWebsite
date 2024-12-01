const mongoose = require("mongoose")

const bannerVedioSchema = new mongoose.Schema({
    vedio: {
        type: String,
        required: true
    }
})

const BannerVedio = mongoose.model("Banner-vedio" ,bannerVedioSchema)

module.exports = BannerVedio