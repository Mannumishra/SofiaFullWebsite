import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // For search functionality
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/all-inplants-product');
                setData(response.data.data);
                setFilteredData(response.data.data); // Set initial filtered data
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to fetch products.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle the search input and filter the data
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setFilteredData(data); // If search is empty, show all data
        } else {
            const filtered = data.filter(item =>
                item.productName.toLowerCase().includes(value.toLowerCase()) ||
                item.inplants.inplantsName.toLowerCase().includes(value.toLowerCase()) ||
                item.category.categoryName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered); // Set filtered data
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://api.sofiasurgicals.com/api/delete-inplants-product/${id}`);
                setData(data.filter(item => item._id !== id));
                setFilteredData(filteredData.filter(item => item._id !== id)); // Remove deleted item from filtered data as well
                toast.success("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product.");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Implants Product List</h4>
                </div>
                <div className="links">
                    <Link to="/add-inplants-product" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                        onChange={handleSearch} // Handle the search input
                    />
                </div>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <section className="d-table">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Category</th>
                                <th scope="col">Implants</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item?.category?.categoryName}</td>
                                    <td>{item?.inplants?.inplantsName}</td>
                                    <td>{item.productName}</td>
                                    <td><img src={`https://api.sofiasurgicals.com/${item.image}`} alt="" /></td>
                                    <td>
                                        <Link to={`/edit-inplants-product/${item._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(item._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination d-flex justify-content-center align-items-center">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                             className="btn btn-primary"
                        >
                            Previous
                        </button>
                        &nbsp;
                        {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
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
                            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                             className="btn btn-primary"
                        >
                            Next
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}

export default AllProduct;
