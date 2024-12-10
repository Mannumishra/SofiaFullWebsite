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

  const handleLogout = () => {
    sessionStorage.removeItem('login'); // Remove login status
    window.location.href = '/login' // Redirect to login page
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
            <a href="https://sofiasurgicals.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-globe"></i>
              Go To Website
            </a>
            <div className="logout" onClick={handleLogout}>
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
                <i className="fa-solid fa-layer-group"></i> Send Us A Message
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
                to="/all-career-query"
                className={location.pathname === '/all-career-query' ? 'active-link' : ''}
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Career Query
              </Link>
            </li>
            <li>
              <Link
                to="/all-category"
                className={
                  location.pathname === '/all-category' ||
                    location.pathname === '/add-category' ||
                    location.pathname.startsWith('/edit-category') // Check for any edit-category route
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Category
              </Link>
            </li>

            <li>
              <Link
                to="/all-inplants"
                className={
                  location.pathname === '/all-inplants' ||
                    location.pathname === '/add-inplants' ||
                    location.pathname.startsWith('/edit-inplant') // Check for dynamic edit-inplant routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Implants
              </Link>
            </li>

            <li>
              <Link
                to="/all-inplants-products"
                className={
                  location.pathname === '/all-inplants-products' ||
                    location.pathname === '/add-inplants-product' ||
                    location.pathname.startsWith('/edit-inplant-product') // Check for dynamic edit-inplant-product routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Manage Implants Product
              </Link>
            </li>

            <li>
              <Link
                to="/all-instupment"
                className={
                  location.pathname === '/all-instupment' ||
                    location.pathname === '/add-instupment' ||
                    location.pathname.startsWith('/edit-instupment') // Check for dynamic edit-instrument routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Instrument
              </Link>
            </li>

            <li>
              <Link
                to="/all-instupment-products"
                className={
                  location.pathname === '/all-instupment-products' ||
                    location.pathname === '/add-instupment-product' ||
                    location.pathname.startsWith('/edit-instupment-product') // Check for dynamic edit-instrument-product routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-layer-group"></i> Manage Instrument Product
              </Link>
            </li>

            <li>
              <Link
                to="/all-vedio"
                className={
                  location.pathname === '/all-vedio' ||
                    location.pathname === '/add-vedio' ||
                    location.pathname.startsWith('/edit-video') // Check for dynamic edit-video routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Video
              </Link>
            </li>

            <li>
              <Link
                to="/all-gallery"
                className={
                  location.pathname === '/all-gallery' ||
                    location.pathname === '/add-gallery' ||
                    location.pathname.startsWith('/edit-gallery') // Check for dynamic edit-gallery routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Gallery
              </Link>
            </li>

            <li>
              <Link
                to="/all-certificate"
                className={
                  location.pathname === '/all-certificate' ||
                    location.pathname === '/add-certificate' ||
                    location.pathname.startsWith('/edit-certificate') // Check for dynamic edit-gallery routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Certificate Image
              </Link>
            </li>
            <li>
              <Link
                to="/all-event-image"
                className={
                  location.pathname === '/all-event-image' ||
                    location.pathname === '/add-event-image' ||
                    location.pathname.startsWith('/edit-event-image') // Check for dynamic edit-gallery routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Event Image
              </Link>
            </li>

            <li>
              <Link
                to="/all-catalog"
                className={
                  location.pathname === '/all-catalog' ||
                    location.pathname === '/add-catalog' ||
                    location.pathname.startsWith('/edit-catalog') // Check for dynamic edit-catalog routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-brands fa-unsplash"></i> Manage Catalogue
              </Link>
            </li>

            <li>
              <Link
                to="/all-testimonial"
                className={
                  location.pathname === '/all-testimonial' ||
                    location.pathname === '/add-testimonial' ||
                    location.pathname.startsWith('/edit-testimonial') // Check for dynamic edit-testimonial routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage Testimonial
              </Link>
            </li>

            <li>
              <Link
                to="/all-faqs"
                className={
                  location.pathname === '/all-faqs' ||
                    location.pathname === '/add-faq' ||
                    location.pathname.startsWith('/edit-faq') // Check for dynamic edit-testimonial routes
                    ? 'active-link'
                    : ''
                }
                onClick={handletoggleBtn}
              >
                <i className="fa-solid fa-tag"></i> Manage FAQs
              </Link>
            </li>
            <button className='logout mb-5' onClick={handleLogout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
