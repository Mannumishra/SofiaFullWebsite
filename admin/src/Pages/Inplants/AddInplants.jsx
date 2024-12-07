import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInplants = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoryName: '',
        inplantsName: '',
        inplantsImage: null
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
        if (!formData.categoryName || !formData.inplantsName || !formData.inplantsImage) {
            toast.error("Please provide all required fields.");
            return;
        }

        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        data.append('inplantsName', formData.inplantsName);
        data.append('inplantsImage', formData.inplantsImage);

        setIsLoading(true);
        try {
            const response = await axios.post('https://api.sofiasurgicals.com/api/create-inplants', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success("Inplant added successfully!");
                setFormData({
                    categoryName: '',
                    inplantsName: '',
                    inplantsImage: null
                });
                navigate("/all-inplants");
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
                    <h4>Add Implants</h4>
                </div>
                <div className="links">
                    <Link to="/all-inplants" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
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
                        <label htmlFor="inplantsName" className="form-label">Inplant Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="inplantsName"
                            className="form-control"
                            id="inplantsName"
                            value={formData.inplantsName}
                            onChange={handleChange}
                            required
                            placeholder='Inplant Name'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inplantsImage" className="form-label">Inplant Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="inplantsImage"
                            className="form-control"
                            id="inplantsImage"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Inplant"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddInplants;
