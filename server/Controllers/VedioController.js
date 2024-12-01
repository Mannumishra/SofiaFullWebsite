const BannerVedio = require("../Models/BannerVedio");
const fs = require('fs').promises;
const path = require('path');

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

// Create a new BannerVedio
const createBannerVedio = async (req, res) => {
    try {
        const newBannerVedio = new BannerVedio({
            vedio: req.file.path // Store the video path
        });

        await newBannerVedio.save();
        res.status(201).json({ message: 'Banner video created successfully', data: newBannerVedio });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Banner video', error: error.message });
    }
};

// Get all BannerVedios
const getAllBannerVedios = async (req, res) => {
    try {
        const bannerVedios = await BannerVedio.find();
        res.status(200).json(bannerVedios);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Banner videos', error: error.message });
    }
};

// Get a single BannerVedio by ID
const getBannerVedioById = async (req, res) => {
    try {
        const bannerVedio = await BannerVedio.findById(req.params.id);
        if (!bannerVedio) {
            return res.status(404).json({ message: 'Banner video not found' });
        }
        res.status(200).json(bannerVedio);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Banner video', error: error.message });
    }
};

// Update a BannerVedio by ID
const updateBannerVedio = async (req, res) => {
    try {
        // Find the existing BannerVedio to get the old video path
        const existingBannerVedio = await BannerVedio.findById(req.params.id);
        if (!existingBannerVedio) {
            return res.status(404).json({ message: 'Banner video not found' });
        }

        // Delete the old video file if it exists
        await deleteFile(existingBannerVedio.vedio);

        // Update the BannerVedio document with the new video path
        const updatedBannerVedio = await BannerVedio.findByIdAndUpdate(
            req.params.id,
            { vedio: req.file.path }, // Update with new video path
            { new: true }
        );

        // Return success response with updated BannerVedio
        res.status(200).json({ message: 'Banner video updated successfully', data: updatedBannerVedio });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Banner video', error: error.message });
    }
};

// Delete a BannerVedio by ID
const deleteBannerVedio = async (req, res) => {
    try {
        const deletedBannerVedio = await BannerVedio.findByIdAndDelete(req.params.id);
        if (!deletedBannerVedio) {
            return res.status(404).json({ message: 'Banner video not found' });
        }
        await deleteFile(deletedBannerVedio.vedio); // Delete the associated video file
        res.status(200).json({ message: 'Banner video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Banner video', error: error.message });
    }
};

module.exports = {
    createBannerVedio,
    getAllBannerVedios,
    getBannerVedioById,
    updateBannerVedio,
    deleteBannerVedio
};
