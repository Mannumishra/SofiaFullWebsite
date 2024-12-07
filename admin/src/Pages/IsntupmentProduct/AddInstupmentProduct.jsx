import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const AddInstupmentProduct = () => {
    const [categories, setCategories] = useState([]);
    const [instupment, setInstupment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        category: '',
        instupment: '',
        productName: '',
        productDetails: '',
        stainlessDetails: '',
        titaniumDetails: '',
        image: null,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-all-category');
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();

    }, []);

    useEffect(() => {
        const fetchinstupment = async () => {
            if (!formData.category) return;
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-instupment-after-details');
                // Assuming inplants data has a 'categoryId' field matching the category's `_id`
                const filteredData = response.data.data.filter((x) => x.categoryName._id === formData.category);
                setInstupment(filteredData);
            } catch (error) {
                console.error("Error fetching instupment:", error);
                toast.error("Failed to fetch instupment.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchinstupment();
    }, [formData.category])

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Prepare form data for submission
        const data = new FormData();
        data.append('category', formData.category);
        data.append('instupment', formData.instupment);
        data.append('productName', formData.productName);
        data.append('productDetails', formData.productDetails);
        data.append('stainlessDetails', formData.stainlessDetails);
        data.append('titaniumDetails', formData.titaniumDetails);
        data.append('image', formData.image);

        try {
            const response = await axios.post('https://api.sofiasurgicals.com/api/create-instupment-product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success("Product added successfully!");
                // Reset form data after successful submission
                setFormData({
                    category: '',
                    instupment: '',
                    productName: '',
                    productDetails: '',
                    stainlessDetails: '',
                    titaniumDetails: '',
                    image: null,
                });
                navigate("/all-instupment-products")
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Instrument Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-instupment-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name='category' className="form-select" id="category" onChange={e => handleChange('category', e.target.value)}>
                            <option selected disabled>Select Category</option>
                            {categories.map((item) => (
                                <option value={item._id} key={item._id}>{item.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="instupment" className="form-label">instupment</label>
                        <select name='instupment' className="form-select" id="instupment" onChange={e => handleChange('instupment', e.target.value)}>
                            <option selected disabled>Select instupment</option>
                            {instupment.map((item) => (
                                <option value={item._id} key={item._id}>{item.instupmentName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" name="productName" className='form-control' placeholder='Product Name' onChange={e => handleChange('productName', e.target.value)} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            value={formData.productDetails}
                            onChange={newContent => handleChange('productDetails', newContent)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="stainlessDetails" className="form-label">Stainless Details</label>
                        <JoditEditor
                            value={formData.stainlessDetails}
                            onChange={newContent => handleChange('stainlessDetails', newContent)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="titaniumDetails" className="form-label">Titanium Details</label>
                        <JoditEditor
                            value={formData.titaniumDetails}
                            onChange={newContent => handleChange('titaniumDetails', newContent)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="file"
                            name="image"
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`${isLoading ? 'not-allowed' : 'allowed'}`}>{isLoading ? "Please Wait..." : "Add Product"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddInstupmentProduct;
