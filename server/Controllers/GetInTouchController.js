const GetinTouch = require('../Models/GetinTouchModel');
const { transporter } = require('../Utils/Nodemailer');

const createGetInTouch = async (req, res) => {
    try {
        const { name, phone, email, country, message } = req.body;

        const errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required.");
        if (!phone) errorMessage.push("Phone is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!country) errorMessage.push("Country is required.");
        if (!message) errorMessage.push("Message is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }

        const newGetInTouch = new GetinTouch({
            name,
            phone,
            email,
            country,
            message
        });

        // Save the new contact record
        const savedGetInTouch = await newGetInTouch.save();
        const mailOptions = {
            from: process.env.MAIL_USER, // Sender's email address
            to: process.env.MAIL_USER,
            subject: 'New GetInTouch Query Received',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #007bff; text-align: center;">New GetInTouch Query</h2>
                    <p>Dear Team,</p>
                    <p>We have received a new GetInTouch query. Below are the details:</p>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
                        <tr>
                            <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left; border: 1px solid #ddd;">Field</th>
                            <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left; border: 1px solid #ddd;">Details</th>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;"><strong>Name</strong></td>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;"><strong>Phone</strong></td>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;"><strong>Email</strong></td>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;"><strong>Country</strong></td>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;">${country}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;"><strong>Message</strong></td>
                            <td style="padding: 10px 15px; border: 1px solid #ddd;">${message}</td>
                        </tr>
                    </table>

                    <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 20px;">
                    <p style="font-size: 12px; color: #666; text-align: center;">This is an automated message. Please do not reply to this email.</p>
                </div>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(201).json({
            message: 'GetInTouch created successfully.',
            data: savedGetInTouch,
        });
    } catch (error) {
        console.error("Error creating GetInTouch:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all GetInTouch records
const getAllGetInTouch = async (req, res) => {
    try {
        const GetInTouchs = await GetinTouch.find();
        if (!GetInTouchs) {
            return res.status(404).json({
                success: false,
                message: "No records found"
            });
        }
        res.status(200).json({
            message: 'All GetInTouchs fetched successfully.',
            data: GetInTouchs.reverse(),
        });
    } catch (error) {
        console.error("Error fetching GetInTouchs:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to update only the status field of a GetInTouch
const updateGetInTouchStatus = async (req, res) => {
    const { id } = req.params; // Get the GetInTouch ID from the URL params
    const { status } = req.body; // Get the new status from the request body

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedGetInTouch = await GetinTouch.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedGetInTouch) {
            return res.status(404).json({ message: 'GetInTouch not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedGetInTouch,
        });
    } catch (error) {
        console.error("Error updating GetInTouch status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteGetintouch = async (req, res) => {
    try {
        const data = await GetinTouch.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                messsage: "Record not found for delete"
            })
        }
        await data.deleteOne()
        res.status(200).json({
            success: true,
            message: "Record Delete Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createGetInTouch,
    getAllGetInTouch,
    updateGetInTouchStatus, // Include this if you're also exporting the status update function
    deleteGetintouch
};
