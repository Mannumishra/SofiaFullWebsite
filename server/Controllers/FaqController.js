const FAQ = require("../Models/FAQModel"); // Adjust the path as necessary

// Create FAQ
const createFAQ = async (req, res) => {
    try {
        const { question, answer, status } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: "Both question and answer are required" });
        }

        const newFAQ = new FAQ({
            question,
            answer,
            status: status || "False",  // Default to "False" if no status is provided
        });

        const savedFAQ = await newFAQ.save();

        res.status(201).json({ message: "FAQ created successfully", data: savedFAQ });
    } catch (error) {
        res.status(500).json({ error: "Error creating FAQ", details: error.message });
    }
};

// Get all FAQs
const getAllFAQs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const faqs = await FAQ.find().skip(skip).limit(limit);
        const totalFaqs = await FAQ.countDocuments();
        const totalPages = Math.ceil(totalFaqs / limit);

        res.status(200).json({
            faqs,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching FAQs" });
    }
};


const getFAQclient = async (req, res) => {
    try {
        const faq = await FAQ.find();

        if (!faq) {
            return res.status(404).json({ error: "FAQ not found" });
        }

        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ error: "Error fetching FAQ", details: error.message });
    }
};
// Get FAQ by ID
const getFAQById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findById(id);

        if (!faq) {
            return res.status(404).json({ error: "FAQ not found" });
        }

        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ error: "Error fetching FAQ", details: error.message });
    }
};

// Update FAQ
const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const { question, answer, status } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: "Both question and answer are required" });
        }

        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer, status: status || "False" }, // Default status to "False" if not provided
            { new: true, runValidators: true }
        );

        if (!updatedFAQ) {
            return res.status(404).json({ error: "FAQ not found" });
        }

        res.status(200).json({ message: "FAQ updated successfully", data: updatedFAQ });
    } catch (error) {
        res.status(500).json({ error: "Error updating FAQ", details: error.message });
    }
};

// Delete FAQ
const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFAQ = await FAQ.findByIdAndDelete(id);

        if (!deletedFAQ) {
            return res.status(404).json({ error: "FAQ not found" });
        }

        res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting FAQ", details: error.message });
    }
};

// Exporting CRUD functions
module.exports = {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQ,
    deleteFAQ,
    getFAQclient
};
