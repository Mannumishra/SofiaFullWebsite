import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEventImage = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
const navigate = useNavigate()
    // Fetch the image data when the component mounts
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-event-image/${id}`); // Adjust API endpoint
                setImagePreview(`https://api.sofiasurgicals.com/${response.data.image}`); // Set image preview
            } catch (error) {
                toast.error('Error fetching image data');
            }
        };
        fetchImageData();
    }, [id]);

    // Handle file selection for the new image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile)); // Show the selected image as a preview
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select an image before submitting');
            return;
        }

        setBtnLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-event-image/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Event Image updated successfully');
                navigate("/all-event-image")
            }
        } catch (error) {
            toast.error('Error updating Event Image');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Gallery Image</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                            Upload Event Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="col-4">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Category Preview"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`btn ${btnLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditEventImage;
