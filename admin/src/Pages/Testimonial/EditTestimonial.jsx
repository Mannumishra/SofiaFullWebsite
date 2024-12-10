import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditTestimonial = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        details: '',
        activeStatus: false
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing testimonial data
        const fetchTestimonial = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-single-textimonial/${id}`);
                const { name, position, details, activeStatus, image } = response.data;
                setFormData({
                    name,
                    position,
                    details,
                    activeStatus
                });
                setImage(image); // Assuming the image is a URL or path
            } catch (error) {
                console.error("Error fetching testimonial:", error);
                toast.error("Failed to fetch testimonial data.");
            }
        };
        fetchTestimonial();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('position', formData.position);
        data.append('details', formData.details);
        data.append('activeStatus', formData.activeStatus ? "True" : "False");
        if (image instanceof File) {
            data.append('image', image);
        }

        try {
            await axios.put(`https://api.sofiasurgicals.com/api/update-textimonial/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Testimonial updated successfully!');
            navigate('/all-testimonial');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update testimonial');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Testimonial</h4>
                </div>
                <div className="links">
                    <Link to="/all-testimonial" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Position</label>
                        <input
                            type="text"
                            name="position"
                            className="form-control"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                        {image && typeof image === 'string' && (
                            <img src={`https://api.sofiasurgicals.com/${image}`} alt="Current" width="50" height="50" className="mt-2" />
                        )}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Details</label>
                        <textarea
                            name="details"
                            className="form-control"
                            placeholder="Details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                            rows={4}
                        />
                    </div>
                    <div className="col-md-6 form-check">
                        <input
                            type="checkbox"
                            name="activeStatus"
                            className="form-check-input"
                            checked={formData.activeStatus}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Active</label>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Update Testimonial"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditTestimonial;
