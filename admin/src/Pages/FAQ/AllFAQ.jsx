import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllFAQ = () => {
    const [faqs, setFaqs] = useState([]); // FAQs data
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total pages count
    const [itemsPerPage, setItemsPerPage] = useState(10); // FAQs per page

    useEffect(() => {
        // Fetch FAQs from the server with pagination
        const fetchFaqs = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-faq', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });

                // Assuming the response contains the faqs and totalPages
                setFaqs(response.data.faqs);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFaqs();
    }, [currentPage, itemsPerPage]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.sofiasurgicals.com/api/delete-faq/${id}`);
            setFaqs(faqs.filter((faq) => faq._id !== id));
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All FAQs</h4>
                </div>
                <div className="links">
                    <Link to="/add-faq" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>
            <section className="mt-2 d-table table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">S No</th>
                            <th scope="col">Question</th>
                            <th scope="col">Answer</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqs.map((faq, index) => (
                            <tr key={faq._id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{faq.question}</td>
                                <td>{faq.answer}</td>
                                <td>{faq.status === "True" ? "True" : "False"}</td>
                                <td>
                                    <Link to={`/edit-faq/${faq._id}`} className="bt edit">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(faq._id)}
                                        className="bt delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Pagination Controls */}
            <div className="pagination" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className='btn btn-primary'>
                    Prev
                </button> &nbsp;
                <span>{currentPage} of {totalPages}</span>&nbsp;
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className='btn btn-primary'>
                    Next
                </button>
            </div>
        </>
    );
};

export default AllFAQ;
