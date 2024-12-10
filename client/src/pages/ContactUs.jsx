import React, { useState } from "react";
import contactImg from "../assets/images/contact-re.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../components/Loader/Loader";

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

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    number: "",
    country: "",
    city: "",
    subject: "",
    message: "",
  });

  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSelect = (country) => {
    setFormData({ ...formData, country });
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.sofiasurgicals.com/api/send-contact",
        formData
      );
      setIsLoading(false);
      Swal.fire(
        "Success",
        "Contact request submitted successfully!",
        "success"
      );
      setFormData({
        name: "",
        profession: "",
        email: "",
        country: "",
        city: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      Swal.fire(
        "Error",
        "Failed to submit dealership request. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      {
        isLoading ? <Loader /> :
          <section
            className="contact-section"
            style={{ background: "linear-gradient(180deg, #CEE5FD, #FFFFFF)" }}
          >
            <div className="container py-5">
              <div className="row">
                <div className="Contact_form d-flex p-4">
                  <div className="col-md-6">
                    <div className="contact2 mx-5">Contact Us</div>
                    <h2>Get In Touch</h2>
                    <p className="pe-5">
                      Sofia Surgicals is the one of the most sold brand in the
                      Indian Orthopedic market. We have very wide range of
                    </p>
                    <div className="imgSection">
                      <img src={contactImg} alt="Contact Us" height={300} />
                    </div>
                  </div>

                  <div className="col-md-6 pt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col mb-4">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Your name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col mb-4">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-12 mb-3">
                          <input
                            type="number"
                            name="number"
                            className="form-control"
                            placeholder="Contact No.*"
                            value={formData.number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-4 position-relative">
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
                              className="list-group position-absolute w-100"
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
                        <div className="col mb-4">
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City*"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-4">
                          <input
                            type="text"
                            name="profession"
                            className="form-control"
                            placeholder="Your Profession*"
                            value={formData.profession}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-4">
                          <input
                            type="text"
                            name="subject"
                            className="form-control"
                            placeholder="Subject*"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-4">
                          <textarea
                            className="form-control"
                            name="message"
                            rows="3"
                            placeholder="Your Message*"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-4">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 w-30"
                          >
                            Submit <span className="ms-2">→</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mt-2 mb-5">
              <div className="row px-3 px-md-5">
                <div className="col-md-3 mb-4">
                  <div className="contact-card p-4 text-center h-100">
                    <FaPhone className="mb-3 faIcon" size={50} />
                    <p className="mb-1">+91-9015555501</p>
                    <p>+91-11-41414592</p>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="contact-card p-4 text-center h-100">
                    <FaEnvelope className="mb-3 faIcon" size={50} />
                    <p className="mb-1">sofiasurgicals@gmail.com</p>
                    <p>exports@sofiasurgicals.com</p>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="contact-card p-4 text-center h-100">
                    <FaMapMarkerAlt className="mb-3 faIcon" size={50} />
                    <p>
                      Regd. Office: 3965/224, 2nd floor, City Market, Ajmeri Gate,
                      Delhi-110006 (INDIA)
                    </p>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="contact-card p-4 text-center h-100">
                    <FaMapMarkerAlt className="mb-3 faIcon" size={50} />
                    <p>
                      Factory : Plot No 74, HSIIDC, Industrial Area, Faridabad - 121004 (Haryana) INDIA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
}

export default ContactUs;
