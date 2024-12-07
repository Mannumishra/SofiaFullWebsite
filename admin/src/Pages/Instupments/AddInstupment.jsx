import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInstupment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoryName: '',
        instupmentName: '',
        instupmentImage: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-all-category'); // Adjust API endpoint as needed
                if (response.data.success) {
                    setCategories(response.data.data); // Assumes categories data is in `data.data`
                } else {
                    toast.error("Failed to fetch categories.");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching categories.");
            }
        };
        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryName || !formData.instupmentName || !formData.instupmentImage) {
            toast.error("Please provide all required fields.");
            return;
        }

        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        data.append('instupmentName', formData.instupmentName);
        data.append('instupmentImage', formData.instupmentImage);

        setIsLoading(true);
        try {
            const response = await axios.post('https://api.sofiasurgicals.com/api/create-instupment', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success("Inplant added successfully!");
                setFormData({
                    categoryName: '',
                    instupmentName: '',
                    instupmentImage: null
                });
                navigate("/all-instupment");
            } else {
                toast.error(response.data.message || "Failed to add inplant.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the inplant.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Instrument</h4>
                </div>
                <div className="links">
                    <Link to="/all-instupment" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category<sup className='text-danger'>*</sup></label>
                        <select
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            value={formData.categoryName}
                            onChange={handleChange}
                            required
                        >
                            <option value="" selected disabled>Select a Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName} {/* Assuming categories have a `name` field */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="instupmentName" className="form-label">Instupment Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="instupmentName"
                            className="form-control"
                            id="instupmentName"
                            value={formData.instupmentName}
                            onChange={handleChange}
                            required
                            placeholder='Instupment Name'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="instupmentImage" className="form-label">Instupment Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="instupmentImage"
                            className="form-control"
                            id="instupmentImage"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Instupment"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddInstupment;
