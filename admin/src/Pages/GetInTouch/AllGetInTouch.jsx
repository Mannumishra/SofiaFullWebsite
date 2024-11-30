import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllGetInTouch = () => {
    const [getintouch, setGetintouch] = useState([]);

    // Fetch contact data on component mount
    useEffect(() => {
        const fetchgetintouch = async () => {
            try {
                const response = await axios.get('https://api.sofia.assortsmachinetools.com/api/all-getintouch'); // Replace with your actual API endpoint
                setGetintouch(response.data.data);
            } catch (error) {
                console.error('Error fetching getintouch:', error);
            }
        };

        fetchgetintouch();
    }, []);

    // Handle status change
    const handleStatusChange = async (id) => {
        try {
            // Update the status to "Complete" in the backend
            await axios.put(`https://api.sofia.assortsmachinetools.com/api/update-getintouch-status/${id}`, { status: 'Complete' });
            setGetintouch((prevgetintouch) =>
                prevgetintouch.map((contact) =>
                    contact._id === id ? { ...contact, status: 'Complete' } : contact
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Get IN Touch Queries</h4>
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Country</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getintouch.length > 0 ? (
                                getintouch.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            {new Date(contact.createdAt).toISOString().slice(8, 10)}/
                                            {new Date(contact.createdAt).toISOString().slice(5, 7)}/
                                            {new Date(contact.createdAt).toISOString().slice(0, 4)}
                                        </td>
                                        <td>
                                            <span style={{ color: contact.status === 'Complete' ? 'green' : 'red', fontSize: "15px", fontWeight: 700 }}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleStatusChange(contact._id)}
                                                disabled={contact.status === 'Complete'}
                                                className={`btn ${contact.status === 'Complete' ? 'btn-secondary' : 'btn-primary'}`}
                                            >
                                                {contact.status === 'Complete' ? 'Completed' : 'Mark as Complete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No getintouch found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AllGetInTouch;
