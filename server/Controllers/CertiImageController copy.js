const fs = require('fs').promises;
const path = require('path');
const CertiImage = require('../Models/CirtificateImage');

// Helper to delete file
const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath); // Ensure the full path
            await fs.unlink(fileToDelete); // Attempt to delete the file directly
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File not found or already deleted:", filePath);
        } else {
            console.error("Error deleting file:", err);
        }
    }
};

// Create a new GalleryImage
const createGalleryImage = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(404).json({
                success: false,
                message: "Name is must required"
            })
        }
        const newGalleryImage = new CertiImage({
            name: name,
            image: req.file.path // Store the image path
        });

        await newGalleryImage.save();
        res.status(201).json({ message: 'Gallery image created successfully', data: newGalleryImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Gallery image', error: error.message });
    }
};

// Get all GalleryImages
const getAllGalleryImages = async (req, res) => {
    try {
        const galleryImages = await CertiImage.find();
        res.status(200).json(galleryImages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Gallery images', error: error.message });
    }
};

// Get a single GalleryImage by ID
const getGalleryImageById = async (req, res) => {
    try {
        const galleryImage = await CertiImage.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }
        res.status(200).json(galleryImage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Gallery image', error: error.message });
    }
};

const updateGalleryImage = async (req, res) => {
    try {
        const { name } = req.body;

        // Fetch the existing image document
        const existingGalleryImage = await CertiImage.findById(req.params.id);
        if (!existingGalleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }

        // Check if a new file is uploaded
        const newImagePath = req.file ? req.file.path : existingGalleryImage.image;

        // Delete the old image file if a new one is uploaded
        if (req.file && existingGalleryImage.image) {
            await deleteFile(existingGalleryImage.image);
        }

        // Update the document
        const updatedGalleryImage = await CertiImage.findByIdAndUpdate(
            req.params.id,
            { image: newImagePath, name },
            { new: true }
        );

        res.status(200).json({ message: 'Gallery image updated successfully', data: updatedGalleryImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update gallery image', error: error.message });
    }
};


// Delete a GalleryImage by ID
const deleteGalleryImage = async (req, res) => {
    try {
        const deletedGalleryImage = await CertiImage.findByIdAndDelete(req.params.id);
        if (!deletedGalleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }
        await deleteFile(deletedGalleryImage.image); // Delete the associated image file
        res.status(200).json({ message: 'Gallery image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Gallery image', error: error.message });
    }
};

module.exports = {
    createGalleryImage,
    getAllGalleryImages,
    getGalleryImageById,
    updateGalleryImage,
    deleteGalleryImage
};
