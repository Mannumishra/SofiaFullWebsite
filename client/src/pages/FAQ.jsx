import React, { useEffect, useState } from 'react';
import './FAQ.css';
import axios from 'axios';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null); // Track the active FAQ item

    // Fetch FAQs
    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.sofiasurgicals.com/api/get-all-faq');
            setFaqs(response.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFAQs(); // Fetch FAQs when the component mounts
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the answer visibility
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <>
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Frequently Asked Questions</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="faq-container">
                {loading ? (
                    <p className="loading-text">Loading FAQs...</p>
                ) : (
                    <div className="faq-list">
                        {faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                faq.status === "True" && (
                                    <div key={faq._id} className="faq-item">
                                        <div className="faq-question" onClick={() => toggleAnswer(index)}>
                                            <h5>{faq.question}</h5>
                                            {activeIndex === index ? <span className="arrowMinus">−</span> : <span className="arrowPlus">+</span>}
                                        </div>
                                        {activeIndex === index && <p className="faq-answer" style={{ backgroundColor: "#DBECFD" }}>{faq.answer}</p>}
                                    </div>
                                )
                            ))
                        ) : (
                            <p>No FAQs available.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default FAQ;
