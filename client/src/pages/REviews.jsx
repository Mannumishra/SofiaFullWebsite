import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CareerPage.css";
import Loader from "../components/Loader/Loader";

const REviews = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        details: '',
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("position", formData.position);
        formDataToSend.append("details", formData.details);
        formDataToSend.append("image", formData.image);

        try {
            const response = await axios.post("https://api.sofiasurgicals.com/api/add-textimonial", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setIsLoading(false)
            Swal.fire({
                title: "Success!",
                text: "Application submitted successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setFormData({ name: "", position: "", details: "", image: null });
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                title: "Error!",
                text: "Error submitting application. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <>
                        <section className="implants">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="ourproduct">
                                            <h2 className="product">Write a Review</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="container-fluid" style={{ backgroundColor: "#CEE5FD" }}>
                            <div className="career-page">
                                <p>
                                    We value your feedback and invite you to share your experience with <strong>Sofia Surgicals</strong>. Your review helps us to improve and provide the best service possible. Whether it's about our products, customer support, or overall experience, we would love to hear from you!
                                </p>
                                <p>
                                    Please take a moment to write your review below. Your input is greatly appreciated and helps us serve you better.
                                </p>
                                <form className="career-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Position</label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your Profession"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Write Comment</label>
                                        <textarea
                                            name="details"
                                            value={formData.details}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="form-control"
                                            placeholder="Write Comment"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
            }
        </>
    );
};

export default REviews;
