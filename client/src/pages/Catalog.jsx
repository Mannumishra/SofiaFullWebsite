import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

function Catalog() {
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
    const [showModal, setShowModal] = useState(false);
    const [selectedCatalogId, setSelectedCatalogId] = useState("");  // State to hold catalog ID
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const [formData, setFormData] = useState({
        catelogId: "",
        name: "",
        email: "",
        country: "",
        phone: "",
        city: "",
        profession: ""
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        if (name === "country") {
            setFilteredCountries(
                countries.filter((country) =>
                    country.toLowerCase().includes(value.toLowerCase())
                )
            );
            setShowSuggestions(true);
        }
        setFormData({ ...formData, [name]: value });
    };
    const handleSelect = (country) => {
        setFormData({ ...formData, country });
        setShowSuggestions(false);
    };

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.sofiasurgicals.com/api/all-catalog");
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loader after data is fetched
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Show modal and set selected catalog ID
    const handleShowModal = (id) => {
        setSelectedCatalogId(id);  // Store catalog ID
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const postData = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const updatedFormData = { ...formData, catelogId: selectedCatalogId }; // Change catalogId to catelogId
            const response = await axios.post("https://api.sofiasurgicals.com/api/download-catelog", updatedFormData);
            if (response.data.success) {
                window.open(response.data.catalogUrl, "_blank");
            }
            handleCloseModal();
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    if (loading || isLoading) {
        return <Loader message="Loading, please wait..." />;
    }

    return (
        <>
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Catalogue</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="container">
                    <div className="row mt-2 implants-card">
                        {data.map((item, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="category-card">
                                    <img
                                        alt={item.catalogName}
                                        className="img-fluid"
                                        src={`https://api.sofiasurgicals.com/${item.catalogImage}`}
                                        width="250"
                                        height="230"
                                    />
                                    <div className="category-title">{item.catalogName}</div>
                                    <div className="btn-group w-100">
                                        <button
                                            className="btn btn-primary"
                                            style={{ borderRadius: '20px' }}
                                            onClick={() => handleShowModal(item._id)}  // Pass catalog ID
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal for Download Form */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Download Brochure</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    className="form-control"
                                    placeholder="Your Name*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="form-control"
                                    placeholder="Your Email*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>
                        <div className="col mb-3">
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                className="form-control"
                                placeholder="Phone Number*"
                                required
                                onChange={getInputData}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <div className="col position-relative">
                                    <input
                                        type="text"
                                        name="country"
                                        className="form-control"
                                        placeholder="Country*"
                                        value={formData.country}
                                        onChange={getInputData}
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
                                {/* <div className="col mb-4">
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        placeholder="City*"
                                        value={formData.city}
                                        onChange={getInputData}
                                        required
                                    />
                                </div> */}
                            </div>

                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    className="form-control"
                                    placeholder="Your City*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    name="profession"
                                    value={formData.profession}
                                    className="form-control"
                                    placeholder="Your Profession*"
                                    required
                                    onChange={getInputData}
                                />
                            </div>
                        </div>

                        <Button variant="primary" className="w-100" type="submit">
                            Submit & Download
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Catalog;
