import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCatalog = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCatalogs();
    }, []);

    const fetchCatalogs = async () => {
        try {
            const response = await axios.get('https://api.sofiasurgicals.com/api/all-catalog');
            console.log(response)
            if (response.data.success) {
                setCatalogs(response.data.data);
                setLoading(false);
            } else {
                toast.error('Failed to load catalogs');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching catalogs:', error);
            toast.error('An error occurred while fetching catalogs');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://api.sofiasurgicals.com/api/delete-catalog/${id}`);
                    if (response.data.success) {
                        toast.success('Catalog deleted successfully');
                        setCatalogs(catalogs.filter((catalog) => catalog._id !== id));
                    } else {
                        toast.error('Failed to delete catalog');
                    }
                } catch (error) {
                    console.error('Error deleting catalog:', error);
                    toast.error('An error occurred while deleting the catalog');
                }
            }
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Catalogue</h4>
                </div>
                <div className="links">
                    <Link to="/add-catalog" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>



            <section className="d-table">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Catalogue Name</th>
                                <th scope="col">Catalogue Image</th>
                                <th scope="col">Catalogue Pdf</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogs.length > 0 ? (
                                catalogs.map((catalog, index) => (
                                    <tr key={catalog._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{catalog.catalogName}</td>
                                        <td>
                                            {catalog.catalogImage ? (
                                                <img src={`https://api.sofiasurgicals.com/${catalog.catalogImage}`} alt="Catalog" style={{ width: '100px', height: '100px' }} />
                                            ) : (
                                                <p>No Image</p>
                                            )}
                                        </td>
                                        <td>
                                            {catalog.catalogPDF ? (
                                                <a href={`https://api.sofiasurgicals.com/${catalog.catalogPDF}`} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                                    View/Download PDF
                                                </a>
                                            ) : (
                                                <p>No PDF Available</p>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/edit-catalog/${catalog._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(catalog._id)} className="bt delete">
                                                Delete <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No catalogs available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
};

export default AllCatalog;
