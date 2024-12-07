import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImage: null,
        categoryStatus: 'False' 
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? (checked ? "True" : "False") : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryName || !formData.categoryImage) {
            toast.error("Please provide both category name and image.");
            return;
        }
        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        data.append('categoryImage', formData.categoryImage);
        data.append('categoryStatus', formData.categoryStatus); 

        setIsLoading(true);
        try {
            const response = await axios.post('https://api.sofiasurgicals.com/api/create-category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success("Category added successfully!");
                setFormData({
                    categoryName: '',
                    categoryImage: null,
                    categoryStatus: 'False' // Reset to string "False"
                });
                navigate("/all-category")
            } else {
                toast.error(response.data.message || "Failed to add category.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "An error occurred while adding the category.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            value={formData.categoryName}
                            onChange={handleChange}
                            required
                            placeholder='Category Name'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="categoryImage"
                            className="form-control"
                            id="categoryImage"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="categoryStatus"
                                id="categoryStatus"
                                checked={formData.categoryStatus === "True"} // Check if categoryStatus is "True"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="categoryStatus">
                                Active in Homepage
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
