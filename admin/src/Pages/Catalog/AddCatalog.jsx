import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCatalog = () => {
    const [formData, setFormData] = useState({
        catalogName: '',
        catalogImage: null,
        catalogPDF: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;
        // Check file type for image input
        if (name === "catalogImage") {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file (e.g., .jpg, .png, .gif)");
                e.target.value = ""; // Clear the input
                return;
            }
        }

        // Check file type for PDF input
        if (name === "catalogPDF") {
            if (file.type !== "application/pdf") {
                alert("Please upload a valid PDF file");
                e.target.value = ""; // Clear the input
                return;
            }
        }
        // Update formData with the selected file
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
        }));
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const { catalogName, catalogImage, catalogPDF } = formData;
        if (!catalogName || !catalogImage || !catalogPDF) {
            toast.error('All fields are required');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('catalogName', catalogName);
        uploadData.append('catalogImage', catalogImage);
        uploadData.append('catalogPDF', catalogPDF);

        try {
            setIsLoading(true);
            const response = await axios.post('https://api.sofiasurgicals.com/api/create-catalog', uploadData,);
            setIsLoading(false);
            if (response.data.success) {
                toast.success('Catalog added successfully');
                navigate('/all-catalog');
            } else {
                toast.error('Failed to add catalog');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating catalog:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Catalogue</h4>
                </div>
                <div className="links">
                    <Link to="/all-catalog" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleFormSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="catalogName" className="form-label">Catalog Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="catalogName"
                            className="form-control"
                            id="catalogName"
                            value={formData.catalogName}
                            onChange={handleInputChange}
                            placeholder='Catalog Name'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="catalogImage" className="form-label">Catalog Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="catalogImage"
                            className="form-control"
                            id="catalogImage"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="catalogPDF" className="form-label">Catalog PDF<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="catalogPDF"
                            className="form-control"
                            id="catalogPDF"
                            onChange={handleFileChange}
                            accept="application/pdf"
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Catalog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCatalog;
