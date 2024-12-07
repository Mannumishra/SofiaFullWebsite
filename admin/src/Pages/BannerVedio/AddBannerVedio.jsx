import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBannerVedio = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);  // Store the video file

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
            toast.error('Please upload a video.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('vedio', file);  // Append the video file to form data

        try {
            // Send POST request with video file
            const response = await axios.post('https://api.sofiasurgicals.com/api/add-vedio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Banner video uploaded successfully!');
            navigate('/all-vedio');  // Redirect after successful upload
        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error(error.response?.data?.message || 'Failed to upload video. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner Video</h4>
                </div>
                <div className="links">
                    <Link to="/all-vedio" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="vedio" className="form-label">Upload Banner Video</label>
                        <input
                            type="file"
                            className="form-control"
                            id="vedio"
                            name="vedio"
                            accept="video/*"  // Allow only video files
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Upload Video"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBannerVedio;
