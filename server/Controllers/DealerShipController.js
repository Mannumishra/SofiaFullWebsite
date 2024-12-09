const DealerShip = require('../Models/DealerShipModel');
const { transporter } = require('../Utils/Nodemailer');

// Controller to create a new dealership record
const createDealerShip = async (req, res) => {
    try {
        const { companyName, companyNumber, companyEmail, companyCountry, companyCity, companyAddress } = req.body;
        const errorMessage = [];

        // Validate required fields
        if (!companyName) errorMessage.push("Company Name is required.");
        if (!companyNumber) errorMessage.push("Company Number is required.");
        if (!companyEmail) errorMessage.push("Company Email is required.");
        if (!companyCountry) errorMessage.push("Company Country is required.");
        if (!companyCity) errorMessage.push("Company City is required.");
        if (!companyAddress) errorMessage.push("Company Address is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }
        const newDealerShip = new DealerShip({
            companyName,
            companyNumber,
            companyEmail,
            companyCountry,
            companyCity,
            companyAddress
        });

        // Save the new dealership record
        const savedDealerShip = await newDealerShip.save();
        // Send email to the company
        const mailOptions = {
            from: process.env.MAIL_USER, // Your email address
            to: process.env.MAIL_USER, // Replace with the company's email address
            subject: "New Dealership Query Received",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #007bff; text-align: center;">New Dealership Query Found</h2>
                <p>Dear Sofia Surgicals Team,</p>
                <p>We have received a new dealership query with the following details:</p>
        
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Field</th>
                        <th style="background-color: #007bff; color: #fff; padding: 10px 15px; text-align: left;">Details</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Company Name:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Company Number:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyNumber}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Company Email:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyEmail}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Country:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyCountry}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>City:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyCity}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
                        <td style="padding: 10px 15px; border-bottom: 1px solid #ddd;">${companyAddress}</td>
                    </tr>
                </table>    
                <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 20px;">
        
                <p style="font-size: 12px; color: #666; text-align: center;">This is an automated message. Please do not reply to this email.</p>
            </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        res.status(201).json({
            message: 'Dealership created successfully.',
            data: savedDealerShip,
        });
    } catch (error) {
        console.error("Error creating dealership:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all dealership records
const getAllDealerShips = async (req, res) => {
    try {
        const dealerShips = await DealerShip.find();
        if (!dealerShips) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            message: 'All dealerships fetched successfully.',
            data: dealerShips.reverse(),
        });
    } catch (error) {
        console.error("Error fetching dealerships:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// Controller to update only the status field
const updateDealerShipStatus = async (req, res) => {
    const { id } = req.params; // Get the dealership ID from the URL params
    const { status } = req.body; // Get the new status from the request body
    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedDealerShip = await DealerShip.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedDealerShip) {
            return res.status(404).json({ message: 'Dealership not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedDealerShip,
        });
    } catch (error) {
        console.error("Error updating dealership status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const deleteDealerShip = async (req, res) => {
    try {
        const data = await DealerShip.findById(req.params.id)
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
    createDealerShip,
    getAllDealerShips,
    updateDealerShipStatus, // Include this if you're also exporting the status update function
    deleteDealerShip
};
