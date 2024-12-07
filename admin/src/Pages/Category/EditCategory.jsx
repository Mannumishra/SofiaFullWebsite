import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImage: null,
        categoryStatus: 'False' 
    });
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-category/${id}`);
                if (response.data.success) {
                    const { categoryName, categoryImage, categoryStatus } = response.data.data;
                    setFormData({
                        categoryName,
                        categoryImage: null, // You may not want to set this directly for security reasons.
                        categoryStatus: categoryStatus === "True" ? "True" : "False"
                    });
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching category details.");
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? (checked ? "True" : "False") : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryName) {
            toast.error("Please provide a category name.");
            return;
        }
        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        if (formData.categoryImage) {
            data.append('categoryImage', formData.categoryImage);
        }
        data.append('categoryStatus', formData.categoryStatus); 

        setBtnLoading(true);
        try {
            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-category/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success("Category updated successfully!");
                navigate("/all-category")
            } else {
                toast.error(response.data.message || "Failed to update category.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while updating the category.");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
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
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input
                            type="file"
                            name="categoryImage"
                            className="form-control"
                            id="categoryImage"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="categoryStatus"
                                id="categoryStatus"
                                checked={formData.categoryStatus === "True"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="categoryStatus">
                                Active in Homepage
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={btnLoading} className={`${btnLoading ? 'not-allowed' : 'allowed'}`}>
                            {btnLoading ? "Please Wait..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
