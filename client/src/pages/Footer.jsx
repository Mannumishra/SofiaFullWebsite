import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/images/footerlogo.png";
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
import Loader from "../components/Loader/Loader";

function Footer() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelect = (country) => {
    setFormData({ ...formData, country });
    setShowSuggestions(false);
  };

  const [categoryData, setCategoryData] = useState([]);
  const catlogData = async () => {
    try {
      const res = await axios.get(
        "https://api.sofiasurgicals.com/api/get-all-category"
      );
      console.log(res);
      setCategoryData(res.data.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    catlogData();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.sofiasurgicals.com/api/send-getintouch",
        formData
      );
      setIsLoading(false);
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
      setIsLoading(false);
      console.error("Error submitting form:", error);
      Swal.fire(
        "Error",
        "Failed to submit getintouch request. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      {
        isLoading ? <Loader /> :
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
                    <Link
                      target="_blank"
                      to="https://g.co/kgs/6dqMdyG"
                    >
                      <FaGoogle size={20} className="icon m-1" />
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
                      : 3965/224 , 2nd floor, City Market , Ajmeri Gate, Delhi-110006
                      (INDIA)
                    </p>
                    <p>
                      <FaMapMarkedAlt className="text-white mx-1 fs-5" /> Factory : Plot No 74, HSIIDC, Industrial Area, Faridabad - 121004 (Haryana) INDIA
                    </p>
                  </div>
                  <div><Link to={`/write-review`} className="btn btn-primary">Write review</Link></div>
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
                      <Link to="/career" className="text-white">
                        Career
                      </Link>
                    </li>
                    <li>
                      <Link to="/Certificates" className="text-white">
                        Our Certificates
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" className="text-white">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div className="col-lg-2 col-md-6 mb-4">
                  <h5 className="mb-3">Categories</h5>
                  <ul className="list-unstyled">
                    {categoryData.map((item, index) => {
                      return (
                        // Add return here
                        <li key={index}>
                          {" "}
                          {/* Add a key for list items */}
                          <Link to="/OurProduct" className="text-white">
                            {item.categoryName}
                          </Link>
                        </li>
                      );
                    })}
                    <Link to='/OurProduct'> <li style={{ color: "white" }}>View All</li></Link>
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
                          type="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Phone Number*"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="col mb-4">
                          <div className="countrySection">
                            <input
                              type="text"
                              name="country"
                              className="form-control"
                              placeholder="Country*"
                              value={formData.country}
                              onChange={handleChange}
                              onFocus={() => setShowSuggestions(true)}
                              required
                            />
                            {showSuggestions && (
                              <ul
                                className="list-group position-absolute"
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  zIndex: 1000,
                                  backgroundColor: "white",
                                }}
                              >
                                {filteredCountries.map((country, index) => (
                                  <li
                                    key={index}
                                    className="list-group-item list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSelect(country)}
                                  >
                                    {country}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
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
      }
    </>
  );
}

export default Footer;
