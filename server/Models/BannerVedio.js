const mongoose = require("mongoose")

const bannerVedioSchema = new mongoose.Schema({
    vedio: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "False",
    }
})

const BannerVedio = mongoose.model("Banner-vedio", bannerVedioSchema)

module.exports = BannerVedio