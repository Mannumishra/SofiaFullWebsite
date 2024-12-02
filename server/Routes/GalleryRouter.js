
const { createGalleryImage, getAllGalleryImages, getGalleryImageById, updateGalleryImage, deleteGalleryImage } = require("../Controllers/GalleryImageController");
const upload = require("../Middleware/Multer");

const GalleryImageRouter = require("express").Router();

// Route to add a new image
GalleryImageRouter.post("/add-image", upload.single("image"), createGalleryImage);

// Route to get all images
GalleryImageRouter.get("/get-images", getAllGalleryImages);

// Route to get a single image by ID
GalleryImageRouter.get("/get-image/:id", getGalleryImageById);

// Route to update an image by ID
GalleryImageRouter.put("/update-image/:id", upload.single("image"), updateGalleryImage);

// Route to delete an image by ID
GalleryImageRouter.delete("/delete-image/:id", deleteGalleryImage);

module.exports = GalleryImageRouter;
