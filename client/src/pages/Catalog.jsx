import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Catalog() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCatalogId, setSelectedCatalogId] = useState("");  // State to hold catalog ID
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        catelogId: "",
        name: "",
        email: "",
        country: "",
        phone: "",
        city: "",
        profession: ""
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.sofia.digiindiasolutions.com/api/all-catalog");
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Show modal and set selected catalog ID
    const handleShowModal = (id) => {
        setSelectedCatalogId(id);  // Store catalog ID
        setShowModal(true);
    };
    
    const handleCloseModal = () => setShowModal(false);

    const postData = async (e) => {
        e.preventDefault();  
        try {
            const updatedFormData = { ...formData, catelogId: selectedCatalogId }; // Change catalogId to catelogId
            const response = await axios.post("https://api.sofia.digiindiasolutions.com/api/download-catelog", updatedFormData);
            if (response.data.success) {
                window.open(response.data.catalogUrl, "_blank");
            }
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <>
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Catalogue</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="implants">
                <div className="container">
                    <div className="row mt-2 implants-card">
                        {data.map((item, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="category-card">
                                    <img
                                        alt={item.catalogName}
                                        className="img-fluid"
                                        src={`https://api.sofia.digiindiasolutions.com/${item.catalogImage}`}
                                        width="250"
                                        height="230"
                                    />
                                    <div className="category-title">{item.catalogName}</div>
                                    <div className="btn-group w-100">
                                        <button
                                            className="btn btn-primary"
                                            style={{ borderRadius: '20px' }}
                                            onClick={() => handleShowModal(item._id)}  // Pass catalog ID
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal for Download Form */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Download Brochure</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    className="form-control"
                                    placeholder="Your Name*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    className="form-control"
                                    placeholder="Your Email*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    className="form-control"
                                    placeholder="Your Country*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    className="form-control"
                                    placeholder="Phone Number*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    className="form-control"
                                    placeholder="Your City*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="profession"
                                    value={formData.profession}
                                    className="form-control"
                                    placeholder="Your Profession*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>

                        <Button variant="primary" className="w-100" type="submit">
                            Submit & Download
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Catalog;
