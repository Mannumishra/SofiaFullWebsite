import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllContactQuery = () => {
    const [contacts, setContacts] = useState([]);

    // Fetch contact data on component mount
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('https://api.sofia.digiindiasolutions.com/api/all-contact'); // Replace with your actual API endpoint
                setContacts(response.data.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    // Handle status change
    const handleStatusChange = async (id) => {
        try {
            // Update the status to "Complete" in the backend
            await axios.put(`https://api.sofia.digiindiasolutions.com/api/update-contact-status/${id}`, { status: 'Complete' });
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
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
                    <h4>All Contact Queries</h4>
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
                                <th scope="col">Profession</th>
                                <th scope="col">Country</th>
                                <th scope="col">City</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.profession}</td>
                                        <td>{contact.country}</td>
                                        <td>{contact.city}</td>
                                        <td>{contact.subject}</td>
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
                                    <td colSpan="11" className="text-center">
                                        No contacts found
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

export default AllContactQuery;
