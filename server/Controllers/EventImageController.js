const fs = require('fs').promises;
const path = require('path');
const IventImage = require('../Models/EventImage');

// Helper to delete file
const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.unlink(fileToDelete);
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

// Create a new Event Image
const createEventImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newEventImage = new IventImage({
            image: req.file.path, // Store the image path
        });

        await newEventImage.save();
        res.status(201).json({ message: 'Event image created successfully', data: newEventImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event image', error: error.message });
    }
};

// Get all Event Images
const getAllEventImages = async (req, res) => {
    try {
        const eventImages = await IventImage.find();
        res.status(200).json(eventImages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event images', error: error.message });
    }
};

// Get a single Event Image by ID
const getEventImageById = async (req, res) => {
    try {
        const eventImage = await IventImage.findById(req.params.id);
        if (!eventImage) {
            return res.status(404).json({ message: 'Event image not found' });
        }
        res.status(200).json(eventImage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch event image', error: error.message });
    }
};

// Update an Event Image by ID
const updateEventImage = async (req, res) => {
    try {
        const existingEventImage = await IventImage.findById(req.params.id);
        if (!existingEventImage) {
            return res.status(404).json({ message: 'Event image not found' });
        }

        // Delete the old image file if it exists
        await deleteFile(existingEventImage.image);

        // Update the Event Image document with the new image path
        const updatedEventImage = await IventImage.findByIdAndUpdate(
            req.params.id,
            { image: req.file ? req.file.path : existingEventImage.image },
            { new: true }
        );

        res.status(200).json({ message: 'Event image updated successfully', data: updatedEventImage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event image', error: error.message });
    }
};

// Delete an Event Image by ID
const deleteEventImage = async (req, res) => {
    try {
        const deletedEventImage = await IventImage.findByIdAndDelete(req.params.id);
        if (!deletedEventImage) {
            return res.status(404).json({ message: 'Event image not found' });
        }

        await deleteFile(deletedEventImage.image);
        res.status(200).json({ message: 'Event image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event image', error: error.message });
    }
};

module.exports = {
    createEventImage,
    getAllEventImages,
    getEventImageById,
    updateEventImage,
    deleteEventImage,
};
