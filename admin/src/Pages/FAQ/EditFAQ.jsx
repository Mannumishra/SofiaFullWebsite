import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditFAQ = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        status: 'False'  // Default status is 'False'
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing FAQ data
        const fetchFAQ = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-single-faq/${id}`);
                const { question, answer, status } = response.data;
                setFormData({
                    question,
                    answer,
                    status
                });
            } catch (error) {
                console.error("Error fetching FAQ:", error);
                toast.error("Failed to fetch FAQ data.");
            }
        };
        fetchFAQ();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStatusChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            status: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            question: formData.question,
            answer: formData.answer,
            status: formData.status
        };

        try {
            await axios.put(`https://api.sofiasurgicals.com/api/update-faq/${id}`, data);
            toast.success('FAQ updated successfully!');
            navigate('/all-faqs'); // Navigate to FAQ list after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update FAQ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit FAQ</h4>
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
                            name="status"
                            className="form-check-input"
                            checked={formData.status === "True"}  // If status is "True", checkbox will be checked
                            onChange={() => setFormData((prevData) => ({
                                ...prevData,
                                status: prevData.status === "True" ? "False" : "True" // Toggle between "True" and "False"
                            }))}
                        />
                        <label className="form-check-label">Active</label>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Update FAQ"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditFAQ;
