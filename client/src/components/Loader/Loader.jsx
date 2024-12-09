import React from 'react';
import './Loader.css'; // Add custom styles in this file

const Loader = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="custom-loader">
            <div className="spinner"></div>
            <p className="loader-message">{message}</p>
        </div>
    );
};

export default Loader;
