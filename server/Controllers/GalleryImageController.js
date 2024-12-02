const fs = require('fs').promises;
const path = require('path');
const GalleryImage = require('../Models/GalleryImage');

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
        const newGalleryImage = new GalleryImage({
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
        const galleryImages = await GalleryImage.find();
        res.status(200).json(galleryImages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Gallery images', error: error.message });
    }
};

// Get a single GalleryImage by ID
const getGalleryImageById = async (req, res) => {
    try {
        const galleryImage = await GalleryImage.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }
        res.status(200).json(galleryImage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Gallery image', error: error.message });
    }
};

// Update a GalleryImage by ID
const updateGalleryImage = async (req, res) => {
    try {
        // Find the existing GalleryImage to get the old image path
        const existingGalleryImage = await GalleryImage.findById(req.params.id);
        if (!existingGalleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }

        // Delete the old image file if it exists
        await deleteFile(existingGalleryImage.image);

        // Update the GalleryImage document with the new image path
        const updatedGalleryImage = await GalleryImage.findByIdAndUpdate(
            req.params.id,
            { image: req.file.path }, // Update with new image path
            { new: true }
        );

        // Return success response with updated GalleryImage
        res.status(200).json({ message: 'Gallery image updated successfully', data: updatedGalleryImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Gallery image', error: error.message });
    }
};

// Delete a GalleryImage by ID
const deleteGalleryImage = async (req, res) => {
    try {
        const deletedGalleryImage = await GalleryImage.findByIdAndDelete(req.params.id);
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
