import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CareerPage.css";

const CareerPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        applyPost: "",
        resume: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("applyPost", formData.applyPost);
        formDataToSend.append("resume", formData.resume);

        try {
            const response = await axios.post("https://api.sofiasurgicals.com/api/apply-job", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                title: "Success!",
                text: "Application submitted successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setFormData({ name: "", email: "", phone: "", applyPost: "", resume: null });
        } catch (error) {
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
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Career</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           <div className="container-fluid"style={{backgroundColor:"#CEE5FD"}}>
           <div className="career-page" >
                <p>
                    We are always interested in finding new talents to join <strong>Sofia Surgicals</strong>. You need to have a great personality
                    that shines through in everything you do and communicate, be committed to your work, eager to increase your knowledge,
                    and of course, have a unique skill to bring to the table.
                </p>
                <p>
                    If you believe you are our next colleague, but none of the job openings below fits you, submit an open application.
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
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Apply for Post</label>
                        <input
                            type="text"
                            name="applyPost"
                            value={formData.applyPost}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter the post you're applying for"
                        />
                    </div>
                    <div className="form-group">
                        <label>Resume (PDF only)</label>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit Application
                    </button>
                </form>
            </div>
           </div>
        </>

    );
};

export default CareerPage;
