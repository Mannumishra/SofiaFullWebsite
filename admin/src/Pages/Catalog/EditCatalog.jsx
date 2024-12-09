import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCatalog = () => {
    const { id } = useParams(); // To get the catalog ID from the route
    const [formData, setFormData] = useState({
        catalogName: '',
        catalogImage: null,
        catalogPDF: null,
    });
    const [existingImage, setExistingImage] = useState('');
    const [existingPDF, setExistingPDF] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch the catalog data on component mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/single-catalog/${id}`);
                if (response.data.success) {
                    const catalog = response.data.data;
                    setFormData({
                        catalogName: catalog.catalogName,
                        catalogImage: null,
                        catalogPDF: null,
                    });
                    setExistingImage(catalog.catalogImage);
                    setExistingPDF(catalog.catalogPDF);
                } else {
                    toast.error('Failed to load catalog data');
                }
            } catch (error) {
                console.error('Error fetching catalog:', error);
                toast.error('An error occurred while loading catalog data');
            }
        };

        fetchCatalog();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        try {
            const updateData = new FormData();
            updateData.append('catalogName', formData.catalogName);
            if (formData.catalogImage) {
                updateData.append('catalogImage', formData.catalogImage);
            }
            if (formData.catalogPDF) {
                updateData.append('catalogPDF', formData.catalogPDF);
            }

            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-catalog/${id}`, updateData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Catalog updated successfully');
                navigate('/all-catalog');
            } else {
                toast.error('Failed to update catalog');
            }
        } catch (error) {
            console.error('Error updating catalog:', error);
            toast.error('An error occurred while updating catalog');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Catalogue</h4>
                </div>
                <div className="links">
                    <Link to="/all-catalog" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleFormSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="catalogName" className="form-label">Catalog Name</label>
                        <input
                            type="text"
                            name="catalogName"
                            className="form-control"
                            id="catalogName"
                            value={formData.catalogName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="catalogImage" className="form-label">Catalog Image</label>
                        <input
                            type="file"
                            name="catalogImage"
                            className="form-control"
                            id="catalogImage"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="col-4">
                        {existingImage && (
                            <img
                                src={existingImage}
                                alt="Catalog Preview"
                                style={{ width: '100px', height: '100px' }}
                            />
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="catalogPDF" className="form-label">Catalog PDF</label>
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
                            disabled={btnLoading}
                            className={`btn ${btnLoading ? 'btn-secondary' : 'btn-primary'}`}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Catalog'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCatalog;
