const { createBannerVedio, getAllBannerVedios, getBannerVedioById, updateBannerVedio, deleteBannerVedio } = require("../Controllers/VedioController")
const upload = require("../Middleware/Multer")

const VedioRouter = require("express").Router()

VedioRouter.post("/add-vedio" ,upload.single("vedio") ,createBannerVedio)
VedioRouter.get("/get-vedio" ,getAllBannerVedios)
VedioRouter.get("/get-vedio/:id" ,getBannerVedioById)
VedioRouter.put("/update-vedio/:id",upload.single("vedio") ,updateBannerVedio)
VedioRouter.delete("/delete-vedio/:id" ,deleteBannerVedio)

module.exports = VedioRouter