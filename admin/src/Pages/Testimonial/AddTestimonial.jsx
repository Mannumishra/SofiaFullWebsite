import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const AddTestimonial = ({ onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        details: '',
        activeStatus: false
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        if (image) {
            data.append('image', image);
        }

        try {
            await axios.post('https://api.sofiasurgicals.com/api/add-textimonial', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Testimonial created successfully!');
            if (onCreate) onCreate();
            navigate('/all-testimonial');
        } catch (error) {
            console.log(error)
            toast.error('Failed to create testimonial');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Create Testimonial</h4>
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
                            {isLoading ? "Please Wait..." : "Create Testimonial"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTestimonial;
