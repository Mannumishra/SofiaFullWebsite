const Contact = require('../Models/ContactModel'); // Make sure to import your Contact model
const { transporter } = require('../Utils/Nodemailer');

const createContact = async (req, res) => {
    try {
        const {
            name,
            profession,
            email,
            country,
            city,
            subject,
            message,
            number
        } = req.body;

        const errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required.");
        if (!number) errorMessage.push("Contact Number is required.");
        if (!profession) errorMessage.push("Profession is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!country) errorMessage.push("Country is required.");
        if (!city) errorMessage.push("City is required.");
        if (!subject) errorMessage.push("Subject is required.");
        if (!message) errorMessage.push("Message is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }

        const newContact = new Contact({
            name,
            profession,
            email,
            country,
            city,
            subject,
            message,
            number
        });

        // Save the new contact record
        const savedContact = await newContact.save();
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,  // Replace with the admin's email address
            subject: "New Contact Inquiry",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #007bff; text-align: center;">New Contact Inquiry</h2>
                <p>Dear Team,</p>
                <p>We have received a new contact inquiry with the following details:</p>
        
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
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Profession:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${profession}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${email}</td>
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
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${subject}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${message}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Contact Number:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${number}</td>
                    </tr>
                </table>
        
                <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 20px;">
        
                <p style="font-size: 12px; color: #666; text-align: center;">This is an automated message. Please do not reply to this email.</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions)
        res.status(201).json({
            message: 'Contact created successfully.',
            data: savedContact,
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all contact records
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts) {
            return res.status(404).json({
                success: false,
                message: "No records found"
            });
        }
        res.status(200).json({
            message: 'All contacts fetched successfully.',
            data: contacts.reverse(),
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to update only the status field of a contact
const updateContactStatus = async (req, res) => {
    const { id } = req.params; // Get the contact ID from the URL params
    const { status } = req.body; // Get the new status from the request body

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedContact,
        });
    } catch (error) {
        console.error("Error updating contact status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteContactShip = async (req, res) => {
    try {
        const data = await Contact.findById(req.params.id)
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
    createContact,
    getAllContacts,
    updateContactStatus, // Include this if you're also exporting the status update function
    deleteContactShip
};
