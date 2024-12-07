import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGalleryImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);  // Store the image file

    const navigate = useNavigate();

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Set the selected file
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if file is selected
        if (!file) {
            toast.error('Please upload an image.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);  // Append the image file to form data

        try {
            // Send POST request with image file
            const response = await axios.post('https://api.sofiasurgicals.com/api/add-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Gallery image uploaded successfully!');
            navigate('/all-gallery');  // Redirect after successful upload
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(error.response?.data?.message || 'Failed to upload image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Gallery Image</h4>
                </div>
                <div className="links">
                    <Link to="/all-gallery" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Upload Gallery Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"  // Allow only image files
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Upload Image"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddGalleryImage;
