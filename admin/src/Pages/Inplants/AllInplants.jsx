import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllInplants = () => {
    const [inplants, setInplants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchInplants = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-inplants');
                setInplants(response.data.data);
            } catch (error) {
                console.error("Error fetching inplants:", error);
                toast.error("Failed to fetch inplants.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInplants();
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
                await axios.delete(`https://api.sofiasurgicals.com/api/delete-inplants/${id}`);
                setInplants(inplants.filter(inplant => inplant._id !== id));
                toast.success("Inplant deleted successfully.");
            } catch (error) {
                console.error("Error deleting inplant:", error);
                toast.error("Failed to delete inplant.");
            }
        }
    };

    // Filter the inplants based on the search term
    const filteredInplants = inplants.filter(inplant =>
        inplant.categoryName.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the current page data
    const indexOfLastInplant = currentPage * itemsPerPage;
    const indexOfFirstInplant = indexOfLastInplant - itemsPerPage;
    const currentInplants = filteredInplants.slice(indexOfFirstInplant, indexOfLastInplant);

    // Pagination logic
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Implants List</h4>
                </div>
                <div className="links">
                    <Link to="/add-inplants" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                    <p>Loading inplants...</p>
                ) : (
                    <>
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.No.</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Implants Name</th>
                                    <th scope="col">Implants Image</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentInplants.length > 0 ? (
                                    currentInplants.map((inplant, index) => (
                                        <tr key={inplant._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{inplant?.categoryName?.categoryName}</td>
                                            <td>{inplant.inplantsName}</td>
                                            <td>
                                                <img src={`https://api.sofiasurgicals.com/${inplant.inplantsImage}`} alt={inplant.inplantsName} style={{ width: '50px', height: '50px' }} />
                                            </td>
                                            <td>
                                                <Link to={`/edit-inplants/${inplant._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(inplant._id)} className="bt delete">Delete <i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No inplants found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="pagination d-flex justify-content-center align-items-center">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-primary"
                            >
                                Previous
                            </button>
                            &nbsp;
                            {Array.from({ length: Math.ceil(filteredInplants.length / itemsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`btn btn-outline-primary ${index + 1 === currentPage ? 'active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            &nbsp;
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredInplants.length / itemsPerPage)}
                                className="btn btn-primary"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </>
    );
}

export default AllInplants;
