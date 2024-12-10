import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        // Fetch testimonials from the server
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-textimonial'); // Adjust this endpoint as per your backend
                setTestimonials(response.data.reverse());
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.sofiasurgicals.com/api/delete-textimonial/${id}`); // Adjust this endpoint as per your backend
            setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Testimonials</h4>
                </div>
                <div className="links">
                    <Link to="/add-testimonial" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
            <section className="mt-2 d-table table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">S No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Details</th>
                            <th scope="col">Image</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((testimonial, index) => (
                            <tr key={testimonial._id}>
                                <td>{index + 1}</td>
                                <td>{testimonial.name}</td>
                                <td>{testimonial.position}</td>
                                <td>{testimonial.details}</td>
                                <td>
                                    {testimonial.image ? (
                                        <img src={`https://api.sofiasurgicals.com/${testimonial.image}`} alt={testimonial.name} width="50" height="50" />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{testimonial.activeStatus}</td>
                                <td>
                                    <Link to={`/edit-testimonial/${testimonial._id}`} className="bt edit">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
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
        </>
    );
};

export default AllTestimonial;
