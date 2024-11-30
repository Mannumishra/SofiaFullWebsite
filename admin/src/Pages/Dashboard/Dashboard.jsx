import React from 'react';
import { FaBoxOpen, FaTags, FaPhone, FaHandshake, FaEnvelope, FaClinicMedical, FaCogs, FaProductHunt, FaStar } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{ backgroundColor: '#ffcccc' }}>
        <FaBoxOpen className="dashboard-icon" />
        <h3 className="dashboard-title">Catalog</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ccffcc' }}>
        <FaTags className="dashboard-icon" />
        <h3 className="dashboard-title">Category</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ccccff' }}>
        <FaPhone className="dashboard-icon" />
        <h3 className="dashboard-title">Contact Query</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ffcc99' }}>
        <FaHandshake className="dashboard-icon" />
        <h3 className="dashboard-title">Dealership Query</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ffccff' }}>
        <FaEnvelope className="dashboard-icon" />
        <h3 className="dashboard-title">Get In Touch Query</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#99ccff' }}>
        <FaClinicMedical className="dashboard-icon" />
        <h3 className="dashboard-title">Inplants</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#cc99ff' }}>
        <FaCogs className="dashboard-icon" />
        <h3 className="dashboard-title">Instrument</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ff99cc' }}>
        <FaProductHunt className="dashboard-icon" />
        <h3 className="dashboard-title">Inplants Product</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#99ff99' }}>
        <FaProductHunt className="dashboard-icon" />
        <h3 className="dashboard-title">Instrument Product</h3>
      </div>

      <div className="dashboard-card" style={{ backgroundColor: '#ff9999' }}>
        <FaStar className="dashboard-icon" />
        <h3 className="dashboard-title">Testimonial</h3>
      </div>
    </div>
  );
};

export default Dashboard;
