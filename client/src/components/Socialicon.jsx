import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp,FaTimes } from 'react-icons/fa';
import barcode from '../assets/images/barcode.png';
import booth28 from '../assets/images/booth28.png';
import booth29 from '../assets/images/booth29.png';
import { Link } from 'react-router-dom';

const Socialicons = () => {
    const [showQR, setShowQR] = useState(false);
    const [showEmails, setShowEmails] = useState(false);
    const [showImages, setShowImages] = useState(true); 

    return (
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
                        <Link to={"https://wa.me/919015555501"}>
                        <FaWhatsapp size={25} style={{ color: '#25D366' }} />
                        </Link>
                    </div>
                    {/* {showQR && (
                        <div className="qr-code">
                            <img src={barcode} alt="WhatsApp QR Code" style={{ width: '170px', height: '170px' }} />
                            <p>Scan QR to Connect</p>
                        </div>
                    )} */}
                </div>
            </div>

            {/* Updated section for showing images */}
            {showImages && (
                <div className="iconImagesStyle" style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={booth28} alt="Booth 28" style={{ width: '170px', height: '170px', marginRight: '10px', background: '#ffffff' }} />
                    <img src={booth29} alt="Booth 29" style={{ width: '170px', height: '170px', background: '#ffffff' }} />

                    {/* Close/cut icon */}
                    <div style={{ top: 0, right: 0, cursor: 'pointer', padding: '2px' }} onClick={() => setShowImages(false)}>
                        <FaTimes size={20} style={{ color: '#000' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Socialicons;
