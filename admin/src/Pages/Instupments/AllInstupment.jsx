import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllInstupment = () => {
    const [instupment, setInstupment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchInstupment = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-instupment');
                console.log(response);
                setInstupment(response.data.data);
            } catch (error) {
                console.error("Error fetching instupment:", error);
                toast.error("Failed to fetch instupment.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstupment();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://api.sofiasurgicals.com/api/delete-instupment/${id}`);
                setInstupment(instupment.filter(inst => inst._id !== id));
                toast.success("Instupment deleted successfully.");
            } catch (error) {
                console.error("Error deleting instupment:", error);
                toast.error("Failed to delete instupment.");
            }
        }
    };

    const filteredInstupment = instupment.filter(instupment =>
        instupment.categoryName.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination: Calculate the current page's items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInstupment.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredInstupment.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Instrument List</h4>
                </div>
                <div className="links">
                    <Link to="/add-instupment" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <section className="d-table">
                {isLoading ? (
                    <p>Loading instupment...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Instrument Name</th>
                                <th scope="col">Instrument Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((instupment, index) => (
                                    <tr key={instupment._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{instupment?.categoryName?.categoryName}</td>
                                        <td>{instupment.instupmentName}</td>
                                        <td>
                                            <img src={`https://api.sofiasurgicals.com/${instupment.instupmentImage}`} alt={instupment.instupmentName} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>
                                            <Link to={`/edit-instupment/${instupment._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(instupment._id)} className="bt delete">Delete <i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No instupment found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </section>

            {/* Pagination */}
            <div className="pagination d-flex justify-content-center align-items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="btn btn-primary"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                &nbsp;
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn btn-outline-primary ${index + 1 === currentPage ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                &nbsp;
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default AllInstupment;
