import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Socialicons = () => {
    const [showQR, setShowQR] = useState(false);
    const [showEmails, setShowEmails] = useState(false);
    const [showImages, setShowImages] = useState(true);
    const [modalImage, setModalImage] = useState(null); // State for modal image
    const [eventImage, setEventImage] = useState([]);

    const getEventImageData = async () => {
        try {
            const res = await axios.get("https://api.sofiasurgicals.com/api/get-event-image");
            setEventImage(res.data.slice(0, 2));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEventImageData();
    }, []);

    const handleImageClick = (image) => {
        setModalImage(image); // Set the clicked image to the modal
    };

    const closeModal = () => {
        setModalImage(null); // Close the modal
    };

    return (
        <>
            <div className="social-icons">
                <div className="icons">
                    <div className="icon">
                        <div className="btn1 text-center pt-2">
                            <Link to="tel:+919015555501">
                                <FaPhoneAlt size={25} />
                            </Link>
                        </div>
                    </div>

                    <div className="icon" onClick={() => setShowEmails(!showEmails)}>
                        <div className="btn1 text-center pt-2">
                            <FaEnvelope size={25} style={{ color: '#FFFFF0' }} />
                        </div>
                        {showEmails && (
                            <div className="email-list">
                                <Link to="mailto:sofiasurgicals@gmail.com" style={{ textDecoration: "none" }}>
                                    <p>sofiasurgicals@gmail.com</p>
                                </Link>
                                <Link to="mailto:exports@sofiasurgicals.com" style={{ textDecoration: "none" }}>
                                    <p>exports@sofiasurgicals.com</p>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="icon">
                        <div className="btn1 text-center pt-2 pb-2">
                            <Link to={"https://wa.me/919015555501"} target='_blank'>
                                <FaWhatsapp size={25} style={{ color: '#25D366' }} />
                            </Link>
                        </div>
                    </div>
                </div>

                {showImages && (
                    <div className="iconImagesStyle">
                        {eventImage.map((item, index) => (
                            <img
                                key={index}
                                src={`https://api.sofiasurgicals.com/${item.image}`}
                                alt="Event"
                                style={{ marginRight: '10px', background: '#ffffff', cursor: 'pointer', height: "200px", width: "200px" }}
                                onClick={() => handleImageClick(`https://api.sofiasurgicals.com/${item.image}`)} // Open image in modal
                            />
                        ))}
                        <div className='cutButton' style={{ top: 0, right: 0, cursor: 'pointer', padding: '2px' }} onClick={() => setShowImages(false)}>
                            <FaTimes size={20} style={{ color: '#000' }} />
                        </div>
                    </div>
                )}


            </div>
            {/* Modal */}
            {modalImage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            width: '500px',
                            height: '500px',
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={modalImage}
                            alt="Modal"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <FaTimes
                            size={30}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: '#000',
                                cursor: 'pointer',
                            }}
                            onClick={closeModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Socialicons;
