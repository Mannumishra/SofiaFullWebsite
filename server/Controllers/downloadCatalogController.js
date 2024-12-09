const Catalog = require("../Models/CatalogModel");
const DownloadCatelog = require("../Models/DownLoadCatelogModel");
const { transporter } = require("../Utils/Nodemailer");


const downloadCatalogController = async (req, res) => {
    try {
        const { name, email, country, phone, city, profession, catelogId } = req.body; // Use catelogId instead of catelogId

        const errorMessage = [];
        if (!name) errorMessage.push("Name is required");
        if (!email) errorMessage.push("Email is required");
        if (!country) errorMessage.push("Country is required");
        if (!phone) errorMessage.push("Phone is required");
        if (!city) errorMessage.push("City is required");
        if (!profession) errorMessage.push("Profession is required");

        if (errorMessage.length > 0) {
            return res.status(400).json({ success: false, message: errorMessage });
        }

        // Check if catalog exists
        const catalog = await Catalog.findById(catelogId); // Use catelogId here
        if (!catalog) {
            return res.status(404).json({
                success: false,
                message: "Catalog not found"
            });
        }

        // Save download record
        const downloadRecord = new DownloadCatelog({
            catelogId, // Use catelogId here
            name,
            email,
            country,
            phone,
            city,
            profession
        });
        await downloadRecord.save();
        const mailOptions = {
            from: process.env.MAIL_USER, // Your email address
            to: process.env.MAIL_USER, // Replace with the company's email address
            subject: "New Catalog Download",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #007bff; text-align: center;">New Catalog Download Request</h2>
                <p>Dear Sofia Surgicals Team,</p>
                <p>We have received a new request for downloading the catalog. The details of the user are as follows:</p>
        
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Field</th>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Details</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Country:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${country}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>City:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${city}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Profession:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${profession}</td>
                    </tr>
                </table>
        
                <p style="margin-top: 20px;">Thank you for downloading the catalog. You can access the catalog using the link below:</p>
                <p style="text-align: center; margin-top: 20px;">
                    <a href="https://api.sofiasurgicals.com/${catalog.catalogPDF}" style="text-decoration: none; color: #fff; background-color: #007bff; padding: 10px 20px; border-radius: 5px;">Download Catalog</a>
                </p>
        
                <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 20px;">
                
                <p style="font-size: 12px; color: #666; text-align: center;">This is an automated message. Please do not reply to this email.</p>
            </div>
            `
        };
        await transporter.sendMail(mailOptions)
        res.status(200).json({
            success: true,
            message: "Thank you for downloading the catalog!",
            catalogUrl: `https://api.sofiasurgicals.com/${catalog.catalogPDF}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to process your request. Please try again later."
        });
    }
}

const getCatlogDownloadRecord = async (req, res) => {
    try {
        const data = await DownloadCatelog.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "REcord Found Successfully",
            data: data.reverse()
        })
    } catch (error) {
        console.log(error)
    }
}


const deleteCatlogDownloadRecord = async (req, res) => {
    try {
        const data = await DownloadCatelog.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        await data.deleteOne()
        res.status(200).json({
            success: true,
            message: "REcord delete Successfully",
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { downloadCatalogController, getCatlogDownloadRecord, deleteCatlogDownloadRecord };
