
const { createGalleryImage, getAllGalleryImages, getGalleryImageById, updateGalleryImage, deleteGalleryImage } = require("../Controllers/CertiImageController copy");
const upload = require("../Middleware/Multer");

const CertiImageRouter = require("express").Router();
CertiImageRouter.post("/add-certi-image", upload.single("image"), createGalleryImage);
CertiImageRouter.get("/get-certi-images", getAllGalleryImages);
CertiImageRouter.get("/get-certi-image/:id", getGalleryImageById);
CertiImageRouter.put("/update-certi-image/:id", upload.single("image"), updateGalleryImage);
CertiImageRouter.delete("/delete-certi-image/:id", deleteGalleryImage);

module.exports = CertiImageRouter;
