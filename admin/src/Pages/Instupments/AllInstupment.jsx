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

    useEffect(() => {
        const fetchInstupment = async () => {
            try {
                const response = await axios.get('https://api.sofia.assortsmachinetools.com/api/all-instupment');
                console.log(response);
                setInstupment(response.data.data);
            } catch (error) {
                console.error("Error fetching inplants:", error);
                toast.error("Failed to fetch inplants.");
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
                await axios.delete(`https://api.sofia.assortsmachinetools.com/api/delete-instupment/${id}`);
                setInstupment(instupment.filter(inplant => inplant._id !== id));
                toast.success("Inplant deleted successfully.");
            } catch (error) {
                console.error("Error deleting inplant:", error);
                toast.error("Failed to delete inplant.");
            }
        }
    };

    const filteredInstupment = instupment.filter(instupment =>
        instupment.categoryName.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Instupment List</h4>
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
                    <p>Loading inplants...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Inplant Name</th>
                                <th scope="col">Inplant Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstupment.length > 0 ? (
                                filteredInstupment.map((instupment, index) => (
                                    <tr key={instupment._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{instupment.categoryName.categoryName}</td>
                                        <td>{instupment.instupmentName}</td>
                                        <td>
                                            <img src={`https://api.sofia.assortsmachinetools.com/${instupment.instupmentImage}`} alt={instupment.instupmentName} style={{ width: '50px', height: '50px' }} />
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
                                    <td colSpan="6" className="text-center">No inplants found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
}

export default AllInstupment;
