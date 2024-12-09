import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllGetInTouch = () => {
    const [getintouch, setGetintouch] = useState([]);  // Store all data
    const [currentPage, setCurrentPage] = useState(1);  // Track current page
    const [recordsPerPage] = useState(10);  // Number of records per page
    const [totalPages, setTotalPages] = useState(1);  // Track total pages

    // Fetch all data on component mount
    useEffect(() => {
        const fetchGetintouch = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/all-getintouch`);
                setGetintouch(response.data.data);
                setTotalPages(Math.ceil(response.data.data.length / recordsPerPage)); // Calculate total pages based on data length
            } catch (error) {
                console.error('Error fetching getintouch:', error);
            }
        };

        fetchGetintouch();
    }, []);

    // Handle status change
    const handleStatusChange = async (id) => {
        try {
            // Update the status to "Complete" in the backend
            await axios.put(`https://api.sofiasurgicals.com/api/update-getintouch-status/${id}`, { status: 'Complete' });
            setGetintouch((prevGetintouch) =>
                prevGetintouch.map((contact) =>
                    contact._id === id ? { ...contact, status: 'Complete' } : contact
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            // Delete the contact in the backend
            await axios.delete(`https://api.sofiasurgicals.com/api/delete-getintouch/${id}`);
            // Remove deleted contact from state
            setGetintouch((prevGetintouch) =>
                prevGetintouch.filter((contact) => contact._id !== id)
            );
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    // Get current records for the page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = getintouch.slice(indexOfFirstRecord, indexOfLastRecord);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All SEND US A MESSAGE</h4>
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
                            {currentRecords.length > 0 ? (
                                currentRecords.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <th scope="row">{indexOfFirstRecord + index + 1}</th>
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
                                            <span style={{ color: contact.status === 'Complete' ? 'green' : 'red', fontSize: '15px', fontWeight: 700 }}>
                                                {contact.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleStatusChange(contact._id)}
                                                disabled={contact.status === 'Complete'}
                                                className={`bt ${contact.status === 'Complete' ? 'edit' : 'edit'}`}
                                            >
                                                {contact.status === 'Complete' ? 'Completed' : 'Mark as Complete'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(contact._id)}
                                                className="bt delete ml-2"
                                            >
                                                Delete
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

                    {/* Pagination */}
                    <div className="pagination d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className='mx-3'>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn btn-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllGetInTouch;
