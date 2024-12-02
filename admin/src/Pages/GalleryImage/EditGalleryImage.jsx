import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditGalleryImage = () => {
    const { id } = useParams(); // Get image ID from the URL params
    const history = useHistory();
    const [imageData, setImageData] = useState({
        title: '',
        image: '',
        active: false
    });
    const [imagePreview, setImagePreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch the image data when component mounts
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get-image/${id}`); // Adjust API endpoint
                setImageData(response.data);
                setImagePreview(`http://localhost:8000/${response.data.image}`); // Set image preview
            } catch (error) {
                toast.error('Error fetching image data');
            }
        };
        fetchImageData();
    }, [id]);

    // Handle file selection for the new image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Show the selected image as a preview
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        const formData = new FormData();
        formData.append('title', imageData.title);
        formData.append('image', e.target.bannerImage.files[0] || ''); // Append new image if selected
        formData.append('active', imageData.active);

        try {
            const response = await axios.put(`http://localhost:8000/api/update-image/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Banner updated successfully');
                history.push('/all-banners'); // Redirect to the list of banners after successful update
            }
        } catch (error) {
            toast.error('Error updating banner');
        } finally {
            setBtnLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setImageData({
            ...imageData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Gallery Image</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Banner Name</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            value={imageData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                        <input
                            type="file"
                            name="bannerImage"
                            className="form-control"
                            id="bannerImage"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="col-4">
                        <img
                            src={imagePreview || ''}
                            alt="Category Preview"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="active"
                                id="active"
                                checked={imageData.active}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="active">
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className={`${btnLoading ? 'not-allowed' : 'allowed'}`} disabled={btnLoading}>
                            {btnLoading ? "Please Wait..." : "Update Banner"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditGalleryImage;
