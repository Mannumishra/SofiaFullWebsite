import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const AddFAQ = ({ onCreate }) => {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        staus: 'False' // Status field with a default value
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (checked ? 'True' : 'False') : value, // Handling checkbox status
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { question, answer, staus } = formData;

        try {
            await axios.post('https://api.sofiasurgicals.com/api/create-faq', {
                question,
                answer,
                staus
            });

            toast.success('FAQ created successfully!');
            if (onCreate) onCreate();
            navigate('/all-faqs');
        } catch (error) {
            console.log(error);
            toast.error('Failed to create FAQ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Create FAQ</h4>
                </div>
                <div className="links">
                    <Link to="/all-faq" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label className="form-label">Question</label>
                        <input
                            type="text"
                            name="question"
                            className="form-control"
                            placeholder="Enter question"
                            value={formData.question}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Answer</label>
                        <textarea
                            name="answer"
                            className="form-control"
                            placeholder="Enter answer"
                            value={formData.answer}
                            onChange={handleChange}
                            required
                            rows={4}
                        />
                    </div>
                    <div className="col-md-6 form-check">
                        <input
                            type="checkbox"
                            name="staus"
                            className="form-check-input"
                            checked={formData.staus === 'True'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Active</label>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Create FAQ"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFAQ;
