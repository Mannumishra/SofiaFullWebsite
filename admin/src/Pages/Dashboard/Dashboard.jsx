import React from 'react';
import { FaBoxOpen, FaTags, FaPhone, FaHandshake, FaEnvelope, FaClinicMedical, FaCogs, FaProductHunt, FaStar } from 'react-icons/fa';
import './Dashboard.css';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Link to='/all-catalog' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ffcccc' }}>
          <FaBoxOpen className="dashboard-icon" />
          <h3 className="dashboard-title">Catalogue</h3>
        </div>
      </Link>

      <Link to='/all-category' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ccffcc' }}>
          <FaTags className="dashboard-icon" />
          <h3 className="dashboard-title">Category</h3>
        </div>
      </Link>

      <Link to='/all-contact-query' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ccccff' }}>
          <FaPhone className="dashboard-icon" />
          <h3 className="dashboard-title">Contact Query</h3>
        </div>
      </Link>

      <Link to='/all-dealership-query' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ffcc99' }}>
          <FaHandshake className="dashboard-icon" />
          <h3 className="dashboard-title">Dealership Query</h3>
        </div>
      </Link>

      <Link to='/all-getintouch-query' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ffccff' }}>
          <FaEnvelope className="dashboard-icon" />
          <h3 className="dashboard-title">Get In Touch Query</h3>
        </div>
      </Link>

      <Link to='/all-inplants' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#99ccff' }}>
          <FaClinicMedical className="dashboard-icon" />
          <h3 className="dashboard-title">Implants</h3>
        </div>
      </Link>

      <Link to='/all-instupment' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#cc99ff' }}>
          <FaCogs className="dashboard-icon" />
          <h3 className="dashboard-title">Instrument</h3>
        </div>
      </Link>

      <Link to='/all-inplants-products' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ff99cc' }}>
          <FaProductHunt className="dashboard-icon" />
          <h3 className="dashboard-title">Implants Product</h3>
        </div>
      </Link>

      <Link to='/all-instupment-products' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#99ff99' }}>
          <FaProductHunt className="dashboard-icon" />
          <h3 className="dashboard-title">Instrument Product</h3>
        </div>
      </Link>

      <Link to='/all-testimonial' style={{ textDecoration: "none" }}>
        <div className="dashboard-card" style={{ backgroundColor: '#ff9999' }}>
          <FaStar className="dashboard-icon" />
          <h3 className="dashboard-title">Testimonial</h3>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
