import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInstupment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        categoryName: '',
        instupmentName: '',
        instupmentImage: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-all-category');
                if (response.data.success) {
                    setCategories(response.data.data);
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

    // Fetch inplant details by ID
    useEffect(() => {
        const fetchInplant = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/single-instupment/${id}`);
                console.log(response)
                if (response.data.success) {
                    const { categoryName, instupmentName } = response.data.data;
                    setFormData({
                        categoryName: categoryName._id,
                        instupmentName,
                        instupmentImage: null
                    });
                } else {
                    toast.error(response.data.message || "Failed to fetch inplant details.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching inplant details.");
            }
        };

        fetchInplant();
    }, [id]);


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data:", formData); // Log to check the data structure

        if (!formData.categoryName || !formData.instupmentName) {
            toast.error("Please provide all required fields.");
            return;
        }

        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        data.append('instupmentName', formData.instupmentName);
        if (formData.instupmentImage) {
            data.append('instupmentImage', formData.instupmentImage);
        }

        setIsLoading(true);
        try {
            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-instupment/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success("Inplant updated successfully!");
                navigate("/all-instupment");
            } else {
                toast.error(response.data.message || "Failed to update inplant.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while updating the inplant.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Instupment</h4>
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
                            <option value="" disabled>Select a Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
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
                        <label htmlFor="instupmentImage" className="form-label">Instupment Image</label>
                        <input
                            type="file"
                            name="instupmentImage"
                            className="form-control"
                            id="instupmentImage"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Update Instupment"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditInstupment;
