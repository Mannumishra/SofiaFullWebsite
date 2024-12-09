const fs = require("fs");
const path = require("path");
const Career = require("../Models/CareerModel");
const { transporter } = require("../Utils/Nodemailer");


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
        const mailOptions = {
            from: process.env.MAIL_USER, // Your email address
            to: process.env.MAIL_USER, // Replace with the company's email address
            subject: "New Career Application Received",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #007bff; text-align: center;">New Career Application</h2>
                <p>Dear Hiring Team,</p>
                <p>We have received a new career application. Below are the details of the applicant:</p>
        
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Field</th>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Details</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${req.body.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${req.body.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${req.body.phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Apply Post:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${req.body.applyPost}</td>
                    </tr>
                </table>
        
                <p style="margin-top: 20px;">The applicant has attached a resume. You can download it using the link below:</p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://yourdomain.com/${req.file.path}" style="text-decoration: none; color: #fff; background-color: #007bff; padding: 10px 20px; border-radius: 5px;">Download Resume</a>
                </p>
        
                <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 20px;">
                
                <p style="font-size: 12px; color: #666; text-align: center;">This is an automated message. Please do not reply to this email.</p>
            </div>
            `
        };
        await transporter.sendMail(mailOptions)
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