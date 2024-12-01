const fs = require("fs");
const path = require("path");
const Career = require("../Models/CareerModel");


const deleteResume = (resumePath) => {
    try {
        const fullPath = path.join(__dirname, "..", resumePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log("Resume deleted successfully.");
        } else {
            console.log("Resume not found.");
        }
    } catch (error) {
        console.error("Error while deleting resume:", error);
    }
};



const createCareer = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required." });
        }

        const newCareer = new Career({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            applyPost: req.body.applyPost,
            resume: req.file.path,
        });

        const savedCareer = await newCareer.save();
        res.status(201).json(savedCareer);
    } catch (error) {
        res.status(500).json({ message: "Error creating career", error });
    }
}

// Get all career entries
const getAllCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching careers", error });
    }
}

// Get a single career entry by ID
const getCareerById = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: "Career not found." });
        }
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: "Error fetching career", error });
    }
}

// Update a career entry
const updateCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: "Career not found." });
        }

        // Delete old resume if a new one is uploaded
        if (req.file) {
            deleteResume(career.resume);
            career.resume = req.file.path;
        }

        career.name = req.body.name || career.name;
        career.email = req.body.email || career.email;
        career.phone = req.body.phone || career.phone;
        career.applyPost = req.body.applyPost || career.applyPost;

        const updatedCareer = await career.save();
        res.status(200).json(updatedCareer);
    } catch (error) {
        res.status(500).json({ message: "Error updating career", error });
    }
}

// Delete a career entry
const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: "Career not found." });
        }

        // Delete the resume file
        deleteResume(career.resume);

        await Career.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Career deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting career", error });
    }
}


module.exports = {
    createCareer, getAllCareers, getCareerById, updateCareer, deleteCareer
}