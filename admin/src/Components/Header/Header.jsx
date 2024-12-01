import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './sofiaLogo.png';

const Header = () => {
  const [sidetoggle, setSideToggle] = useState(false);
  const location = useLocation();

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle);
  };

  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <img src={logo} alt="Logo" style={{ width: '300px' }} />
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="https://client.sofia.assortsmachinetools.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-globe"></i>
              Go To Website
            </a>
            <div className="logout">
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>

        <div className={`rightNav ${sidetoggle ? 'active' : ''}`}>
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === '/dashboard' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/all-dealership-query"
                className={location.pathname === '/all-dealership-query' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> DealerShip Query
              </Link>
            </li>
            <li>
              <Link
                to="/all-getintouch-query"
                className={location.pathname === '/all-getintouch-query' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> GetInTouch Query
              </Link>
            </li>
            <li>
              <Link
                to="/all-contact-query"
                className={location.pathname === '/all-contact-query' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Contact Query
              </Link>
            </li>
            <li>
              <Link
                to="/all-catelog-query"
                className={location.pathname === '/all-catelog-query' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Download Catelog Query
              </Link>
            </li>
            <li>
              <Link
                to="/all-category"
                className={location.pathname === '/all-category' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Category
              </Link>
            </li>
            <li>
              <Link
                to="/all-inplants"
                className={location.pathname === '/all-inplants' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Inplants
              </Link>
            </li>
            <li>
              <Link
                to="/all-instupment"
                className={location.pathname === '/all-instupment' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Instupment
              </Link>
            </li>
            <li>
              <Link
                to="/all-inplants-products"
                className={location.pathname === '/all-inplants-products' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Manage Inplants Product
              </Link>
            </li>
            <li>
              <Link
                to="/all-instupment-products"
                className={location.pathname === '/all-instupment-products' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Manage Instupment Product
              </Link>
            </li>
            <li>
              <Link
                to="/all-catalog"
                className={location.pathname === '/all-catalog' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-brands fa-unsplash"></i> Manage Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/all-testimonial"
                className={location.pathname === '/all-testimonial' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Testimonial
              </Link>
            </li>
            <button className='logout mb-5'>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
