const mongoose = require("mongoose")

const careerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    applyPost: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
},{timestamps:true})

const Career = mongoose.model("Career" ,careerSchema)

module.exports = Career