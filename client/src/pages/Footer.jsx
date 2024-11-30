import React, { useState } from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/images/sofia.png";
import {
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaMapMarkedAlt,
  FaPhone,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";

function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.sofia.digiindiasolutions.com/api/send-getintouch",
        formData
      );
      Swal.fire(
        "Success",
        "Getintouch request submitted successfully!",
        "success"
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire(
        "Error",
        "Failed to submit getintouch request. Please try again.",
        "error"
      );
    }
  };

  return (
    <footer className="bg-primary text-white py-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="mb-3">
              <img src={footerLogo} alt="Sofia Logo" width={"210px"} />
            </h4>
            <p>
              Your Trusted Source for Quality Orthopedic Implants & Instruments
            </p>
            <div className="social-links mb-3">
              <Link
                target="_blank"
                to="https://www.facebook.com/indra.chauhan.18?mibextid=LQQJ4d"
              >
                <FaFacebook size={20} className="icon m-1" />
              </Link>
              <Link target="_blank" to="https://wa.me/919015555501">
                <FaWhatsapp size={20} className="icon m-1" />
              </Link>
              <Link
                target="_blank"
                to="https://www.linkedin.com/in/sofia-surgicals-pvt-ltd-231310126?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              >
                <FaLinkedin size={20} className="icon m-1" />
              </Link>
              <Link
                target="_blank"
                to="https://www.instagram.com/sofia_surgicals/profilecard/?igsh=ZHF1am5xeHFjYmY2"
              >
                <FaInstagram size={20} className="icon m-1" />
              </Link>
              <Link target="_blank" to="https://x.com/sofiasurgicals?s=11">
                <BsTwitterX size={20} className="icon m-1" />
              </Link>
              <Link
                target="_blank"
                to="https://youtube.com/@sofiasurgicals4790?si=QhwQt4xWsRBh6VF4"
              >
                <FaYoutube size={20} className="icon m-1" />
              </Link>
            </div>
            <div>
              <p>
                <strong>Contact Us</strong>
              </p>
              <p>
                <FaEnvelope className="text-white mx-1 fs-5" />{" "}
                sofiasurgicals@gmail.com
              </p>
              <p>
                <FaEnvelope className="text-white mx-1 fs-5" />{" "}
                exports@sofiasurgicals.com
              </p>
              <p>
                <FaPhone className="text-white mx-1 fs-5" /> +91 -9015555501
              </p>
              <p>
                <FaMapMarkedAlt className="text-white mx-1 fs-5" /> Regd. Office
                : 3965/224 , 2nd floor City Market , Ajmeri Gate, Delhi-110006
                (INDIA)
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About-us" className="text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/Contact-us" className="text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/Certificates" className="text-white">
                  Our Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Category 1
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Category 2
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Category 3
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Category 4
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="col-lg-5 col-md-6">
            <div className="messageForm">
              <h3 className="mb-3">Send Us A Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control mb-3"
                    placeholder="Name*"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control mb-3"
                    placeholder="E-Mail Id*"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control mb-3"
                    placeholder="Phone Number*"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-control mb-3 select-placeholder"
                    required
                  >
                    <option value="">Select Country*</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control mb-3"
                    rows="3"
                    placeholder="Leave A Message For Us*"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-light w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
