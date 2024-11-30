import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api.sofia.digiindiasolutions.com/api/all-inplants-product'); // Adjust API endpoint as needed
                setData(response.data.data); // Assuming the data is in the 'data' field
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to fetch products.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                await axios.delete(`https://api.sofia.digiindiasolutions.com/api/delete-inplants-product/${id}`); // Adjust API endpoint as needed
                setData(data.filter(item => item._id !== id)); // Remove the deleted item from the state
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
                    <h4>All Product List</h4>
                </div>
                <div className="links">
                    <Link to="/add-inplants-product" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
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
                                <th scope="col">Inplants</th>
                                <th scope="col">Product Name</th>
                                {/* <th scope="col">Product Details</th>
                                <th scope="col">Stainless Details</th>
                                <th scope="col">Titanium Details</th> */}
                                <th scope="col">Product Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.category.categoryName}</td>
                                    <td>{item.inplants.inplantsName}</td>
                                    <td>{item.productName}</td>
                                    <td><img src={`https://api.sofia.digiindiasolutions.com/${item.image}`} alt="" /></td>
                                    {/* <td>{item.productDetails}</td>
                                    <td>{item.stainlessDetails}</td>
                                    <td>{item.titaniumDetails}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td> Assuming you have a createdAt field */}
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
                </section>
            )}
        </>
    );
}

export default AllProduct;
