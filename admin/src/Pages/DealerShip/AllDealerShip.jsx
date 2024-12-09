import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllDealerShip = () => {
    const [dealerships, setDealerships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dealershipsPerPage] = useState(10);

    // Fetch dealership data on component mount
    useEffect(() => {
        const fetchDealerships = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-dealership'); // Replace with your actual API endpoint
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
            await axios.put(`https://api.sofiasurgicals.com/api/update-dealership-status/${id}`, { status: 'Complete' });
            setDealerships((prevDealerships) =>
                prevDealerships.map((dealer) =>
                    dealer._id === id ? { ...dealer, status: 'Complete' } : dealer
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Handle delete dealership
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.sofiasurgicals.com/api/delete-dealership/${id}`);
            setDealerships((prevDealerships) =>
                prevDealerships.filter((dealer) => dealer._id !== id)
            );
        } catch (error) {
            console.error('Error deleting dealership:', error);
        }
    };

    // Pagination logic
    const indexOfLastDealership = currentPage * dealershipsPerPage;
    const indexOfFirstDealership = indexOfLastDealership - dealershipsPerPage;
    const currentDealerships = dealerships.slice(indexOfFirstDealership, indexOfLastDealership);

    const totalPages = Math.ceil(dealerships.length / dealershipsPerPage);

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
                            {currentDealerships.length > 0 ? (
                                currentDealerships.map((dealer, index) => (
                                    <tr key={dealer._id}>
                                        <th scope="row">{index + 1 + (currentPage - 1) * dealershipsPerPage}</th>
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
                                            <span style={{ color: dealer.status === 'Complete' ? 'green' : 'red', fontSize: "15px", fontWeight: 700 }}>
                                                {dealer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleStatusChange(dealer._id)}
                                                disabled={dealer.status === 'Complete'}
                                                className={`bt ${dealer.status === 'Complete' ? 'edit' : 'edit'}`}
                                            >
                                                {dealer.status === 'Complete' ? 'Completed' : 'Complete'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dealer._id)}
                                                className="bt delete ml-2"
                                            >
                                                Delete
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

            <div className="pagination d-flex justify-content-center align-items-center">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-primary"
                >
                    Previous
                </button>
                <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>

        </>
    );
};

export default AllDealerShip;
