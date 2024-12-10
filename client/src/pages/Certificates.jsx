import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import certificates from '../assets/images/certificates.png';
import backgroundImage from '../assets/images/certificatesback.png';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

function Certificates() {
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);

    //  CardData Array

    const [images, setImage] = useState([])
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-certi-images');  // Adjust API endpoint for images
                setImage(response.data);
                // setIsLoading(false);
            } catch (error) {
                // setIsLoading(false);
            } finally {
                setLoading(false); // Stop loader after data is fetched
            }
        };

        fetchImages();
    }, []);

    const handleShowModal = (image) => {
        setCurrentImage(image.image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    if (loading) {
        return <Loader message="Fetching Certificates..." />;
    }

    return (
        <>

            <section className="implants">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Certificates</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* image section  */}

            <div >
                <div className="container py-4">
                    <div className="row">
                        {images.map((image, index) => (
                            <div className="col-md-4 mb-5" key={index}>
                                <div className="image-frame" style={{ backgroundImage: `url(${backgroundImage})` }}>
                                    <img src={`https://api.sofiasurgicals.com/${image.image}`} alt={image.title} className="inner-image" onClick={() => handleShowModal(image)} style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-center pt-3 fs-5 fw-bold">{image.name}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* image popup open  */}

                    <Modal
                        show={showModal} onHide={handleCloseModal} centered size="sm">
                        <Modal.Body className="p-1">
                            <img src={`https://api.sofiasurgicals.com/${currentImage}`} alt="Certificate" className="img-fluid" style={{ width: '100%', height: '450px' }} />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Certificates;
