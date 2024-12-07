import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategory = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(10); // You can change this value to control how many categories per page

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-all-category'); // Adjust the endpoint as necessary
                setCategories(response.data.data); // Assuming the response contains the array of categories
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
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
                await axios.delete(`https://api.sofiasurgicals.com/api/delete-category/${id}`); // Adjust the endpoint as necessary
                setCategories(categories.filter(category => category._id !== id));
                toast.success("Category deleted successfully.");
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error(error.response.data.message);
            }
        }
    };

    const filteredCategories = categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Category List</h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                    <p>Loading categories...</p>
                ) : (
                    <>
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Show in home page</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.length > 0 ? (
                                    currentCategories.map((category, index) => (
                                        <tr key={category._id}>
                                            <th scope="row">{index + 1 + indexOfFirstCategory}</th>
                                            <td>{category.categoryName}</td>
                                            <td>
                                                <img src={`https://api.sofiasurgicals.com/${category.categoryImage}`} alt={category.categoryName} style={{ width: '50px', height: '50px' }} />
                                            </td>
                                            <td>{category.categoryStatus === 'True' ? 'Yes' : 'No'}</td>
                                            <td>
                                                <Link to={`/edit-category/${category._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(category._id)} className="bt delete">Delete <i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination d-flex justify-content-center align-items-center">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`btn btn-primary ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                Previous
                            </button> &nbsp;
                            {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, index) => (
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
                                disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
                                className={`btn btn-primary ${currentPage === Math.ceil(filteredCategories.length / categoriesPerPage) ? 'disabled' : ''}`}
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

export default AllCategory;
