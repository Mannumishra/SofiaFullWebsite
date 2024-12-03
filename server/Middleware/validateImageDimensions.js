const sharp = require("sharp");
const fs = require("fs").promises;

const validateImageDimensions = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    try {
        // Read image dimensions
        const metadata = await sharp(req.file.path).metadata();

        if (metadata.width !== 100 || metadata.height !== 150) {
            // Delete the uploaded file if validation fails
            await fs.unlink(req.file.path);
            return res.status(400).json({
                message: "Image dimensions must be exactly 100x150px",
            });
        }

        next(); // Continue if validation passes
    } catch (error) {
        console.error("Error validating image dimensions:", error);
        return res.status(500).json({ message: "Failed to process image", error: error.message });
    }
};

module.exports = validateImageDimensions;
