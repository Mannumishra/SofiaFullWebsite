import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstrumentProduct() {
    const [selectedMaterial, setSelectedMaterial] = useState('Stainless Steel');
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);  // Product data
    const [loading, setLoading] = useState(true);  // Loading state
    const { name } = useParams();

    // Function to handle material selection
    const handleMaterialClick = (material) => {
        setSelectedMaterial(material);
    };

    // Function to handle modal visibility
    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Fetch product data from API
    const getApiData = async () => {
        try {
            const res = await axios.get(`https://api.sofiasurgicals.com/api/single-instupment-product-name/${name}`);
            setData(res.data.data || null);  // Ensure data is set to null if not available
        } catch (error) {
            console.log(error);
            setData(null);  // Handle error case by setting data to null
        } finally {
            setLoading(false);  // Hide loading spinner once data is fetched
        }
    };

    useEffect(() => {
        getApiData();
    }, [name]);

    if (loading) {
        return <p className="text-center">Loading product details...</p>;
    }

    if (data === null) {
        return <p className='text-uppercase mb-5 mt-5 text-center fs-2'> No product details available for this implant.</p>;
    }

    const { image, productDetails, stainlessDetails, titaniumDetails } = data;

    return (
        <>
            {image && productDetails ? (
                <div className='ThumbnailSection' style={{ background: 'linear-gradient(175deg, #CEE5FD 0%, #FFFFFF 100%)' }}>
                <div className="container ThumbnailSection">
                    <div className="row px-3 px-md-5">
                        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                            <img
                                src={`https://api.sofiasurgicals.com/${image}`}
                                alt="Product View"
                                className="img-fluid thumbnailImage"
                                style={{ maxHeight: '350px', width: '90%', cursor: 'pointer' }}
                                onClick={handleImageClick}
                                loading="lazy"  // Lazy loading
                            />
                        </div>
                        <div className="col-12 col-md-6" dangerouslySetInnerHTML={{ __html: productDetails }} />
                    </div>

                    {/* Modal Component */}
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Product View</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={`https://api.sofiasurgicals.com/${image}`} alt="Product View" className="img-fluid" />
                        </Modal.Body>
                    </Modal>

                    <div className="container pt-5">
                        <div className="row px-3 px-md-5">
                            <div className="col-12 border border-primary rounded pt-2" style={{ background: '#3496FF' }}>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {/* Radio Button for Stainless Steel */}
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio1"
                                        autoComplete="off"
                                        value="Stainless Steel"
                                        checked={selectedMaterial === 'Stainless Steel'}
                                        onChange={() => handleMaterialClick('Stainless Steel')}
                                    />
                                    <label
                                        className="btn"
                                        htmlFor="btnradio1"
                                        style={{
                                            background: selectedMaterial === 'Stainless Steel' ? '#fff' : '#3496FF',
                                            color: selectedMaterial === 'Stainless Steel' ? '#000' : '#fff',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Stainless Steel
                                    </label>

                                    {/* Radio Button for Titanium */}
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio2"
                                        autoComplete="off"
                                        value="Titanium"
                                        checked={selectedMaterial === 'Titanium'}
                                        onChange={() => handleMaterialClick('Titanium')}
                                    />
                                    <label
                                        className="btn"
                                        htmlFor="btnradio2"
                                        style={{
                                            background: selectedMaterial === 'Titanium' ? '#fff' : '#3496FF',
                                            color: selectedMaterial === 'Titanium' ? '#000' : '#fff',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Titanium
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4 mb-4 px-3 px-md-5">
                            <div className="col-12">
                                {/* Conditionally render material details */}
                                {selectedMaterial === 'Stainless Steel' ? (
                                    stainlessDetails ? (
                                        <div
                                            style={{
                                                maxHeight: '400px',
                                                overflowY: 'auto',
                                            }}
                                            dangerouslySetInnerHTML={{ __html: stainlessDetails }}
                                        />
                                    ) : (
                                        <p>Stainless steel details are not available.</p>
                                    )
                                ) : (
                                    titaniumDetails ? (
                                        <div
                                            style={{
                                                maxHeight: '400px',
                                                overflowY: 'auto',
                                            }}
                                            dangerouslySetInnerHTML={{ __html: titaniumDetails }}
                                        />
                                    ) : (
                                        <p>Titanium details are not available.</p>
                                    )
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                </div>

            ) : (
                <p>No product details available for this implant.</p>
            )}
        </>
    );
}

export default InstrumentProduct;
