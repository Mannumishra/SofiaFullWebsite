import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditGalleryImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageData, setImageData] = useState({
        image: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch the image data when component mounts
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-image/${id}`); // Adjust API endpoint
                setImageData(response.data);
                setImagePreview(`https://api.sofiasurgicals.com/${response.data.image}`); // Set image preview
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
        formData.append('image', e.target.bannerImage.files[0] || ''); // Append the selected image if available

        try {
            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-image/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Gallery image updated successfully');
                navigate('/all-gallery'); // Redirect to the list of banners after successful update
            }
        } catch (error) {
            toast.error('Error updating gallery image');
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
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="bannerImage" className="form-label">Gallery Image</label>
                        <input
                            type="file"
                            name="bannerImage"
                            className="form-control"
                            id="bannerImage"
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    {/* Image preview section */}
                    <div className="col-md-4">
                        <label className="form-label">Current Image</label>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Current Image" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className={`${btnLoading ? 'not-allowed' : 'allowed'}`} disabled={btnLoading}>
                            {btnLoading ? "Please Wait..." : "Update Image"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditGalleryImage;
