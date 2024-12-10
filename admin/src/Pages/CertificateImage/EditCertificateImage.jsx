import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCertificateImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageData, setImageData] = useState({
        image: '',
        name: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch the image data when component mounts
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-certi-image/${id}`); // Adjust API endpoint
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
            setImagePreview(URL.createObjectURL(file)); // Show the selected image preview
            setImageData((prev) => ({ ...prev, image: file })); // Update image state
        }
    };

    const getinputData = (e) => {
        const { name, value } = e.target
        setImageData({ ...imageData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        const formData = new FormData();
        formData.append('image', e.target.bannerImage.files[0] || ''); // Append the selected image
        formData.append('name', imageData.name); // Append name

        try {
            const response = await axios.put(
                `https://api.sofiasurgicals.com/api/update-certi-image/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 200) {
                toast.success('Gallery image updated successfully');
                navigate('/all-certificate');
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
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Cirtificate Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={getinputData}
                            required
                            value={imageData.name}
                        />
                    </div>
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
                            <img src={imagePreview} alt="Preview Image" style={{ width: '100%', height: 'auto' }} />
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

export default EditCertificateImage;
