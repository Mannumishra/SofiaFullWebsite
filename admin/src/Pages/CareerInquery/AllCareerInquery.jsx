import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCareerInquery = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const fetchCatalogs = async () => {
        try {
            const response = await axios.get("https://api.sofiasurgicals.com/api/get-carrer-records");
            if (response.status === 200) {
                setCatalogs(response.data.reverse());
                setLoading(false);
            } else {
                toast.error("Failed to load catalogs");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching catalogs:", error);
            toast.error("An error occurred while fetching catalogs");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://api.sofiasurgicals.com/api/delete-career-record/${id}`);
                    if (response.data.success) {
                        toast.success("Catalog deleted successfully");
                        setCatalogs(catalogs.filter((catalog) => catalog._id !== id));
                    } else {
                        toast.error("Failed to delete catalog");
                    }
                } catch (error) {
                    console.error("Error deleting catalog:", error);
                    toast.error("An error occurred while deleting the catalog");
                }
            }
        });
    };

    // Pagination logic
    const totalPages = Math.ceil(catalogs.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentRecords = catalogs.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Career Query</h4>
                </div>
            </div>

            <section className="d-table">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Apply Post</th>
                                    <th scope="col">Resume</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((catalog, index) => (
                                        <tr key={catalog._id}>
                                            <th scope="row">{startIndex + index + 1}</th>
                                            <td>{catalog.name}</td>
                                            <td>{catalog.email}</td>
                                            <td>{catalog.phone}</td>
                                            <td>{catalog.applyPost}</td>
                                            <td>
                                                {catalog.resume ? (
                                                    <a
                                                        href={`https://api.sofiasurgicals.com/${catalog.resume}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-link"
                                                    >
                                                        View/Download PDF
                                                    </a>
                                                ) : (
                                                    <p>No PDF Available</p>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(catalog._id)}
                                                    className="bt delete"
                                                >
                                                    Delete <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No catalogs available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination controls */}

                        <div className="pagination d-flex justify-content-center align-items-center">
                            <button
                                className="btn btn-primary"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                                &nbsp;
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`btn btn-outline-primary ${currentPage === page ? "active" : ""}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            &nbsp;
                            <button
                                className="btn btn-primary"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>

                    </>
                )}
            </section>
        </>
    );
};

export default AllCareerInquery;
