import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllDealerShip = () => {
    const [dealerships, setDealerships] = useState([]);

    // Fetch dealership data on component mount
    useEffect(() => {
        const fetchDealerships = async () => {
            try {
                const response = await axios.get('https://api.sofia.assortsmachinetools.com/api/all-dealership'); // Replace with your actual API endpoint
                setDealerships(response.data.data);
            } catch (error) {
                console.error('Error fetching dealerships:', error);
            }
        };

        fetchDealerships();
    }, []);

    // Handle status change
    const handleStatusChange = async (id) => {
        try {
            // Update the status to "Complete" in the backend
            await axios.put(`https://api.sofia.assortsmachinetools.com/api/update-dealership-status/${id}`, { status: 'Complete' });
            setDealerships((prevDealerships) =>
                prevDealerships.map((dealer) =>
                    dealer._id === id ? { ...dealer, status: 'Complete' } : dealer
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
                    <h4>All Dealerships</h4>
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Company Number</th>
                                <th scope="col">Company Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">City</th>
                                <th scope="col">Address</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dealerships.length > 0 ? (
                                dealerships.map((dealer, index) => (
                                    <tr key={dealer._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{dealer.companyName}</td>
                                        <td>{dealer.companyNumber}</td>
                                        <td>{dealer.companyEmail}</td>
                                        <td>{dealer.companyCountry}</td>
                                        <td>{dealer.companyCity}</td>
                                        <td>{dealer.companyAddress}</td>
                                        <td>
                                            {new Date(dealer.createdAt).toISOString().slice(8, 10)}/
                                            {new Date(dealer.createdAt).toISOString().slice(5, 7)}/
                                            {new Date(dealer.createdAt).toISOString().slice(0, 4)}
                                        </td>
                                        <td>
                                            <span style={{ color: dealer.status === 'Complete' ? 'green' : 'red' , fontSize:"15px" ,fontWeight:700}}>
                                                {dealer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleStatusChange(dealer._id)}
                                                disabled={dealer.status === 'Complete'}
                                                className={`btn ${dealer.status === 'Complete' ? 'btn-secondary' : 'btn-primary'}`}
                                            >
                                                {dealer.status === 'Complete' ? 'Completed' : 'Mark as Complete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No dealerships found
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

export default AllDealerShip;
