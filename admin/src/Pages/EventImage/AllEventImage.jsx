import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllEventImage = () => {
    const [images, setImages] = useState([]);  // Renamed from 'videos' to 'images'
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the images on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-event-image');  // Adjust API endpoint for images
                setImages(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.error('Error fetching images');
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Delete image function
    const deleteImage = async (imageId) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                // Delete the image from the backend
                const response = await axios.delete(`https://api.sofiasurgicals.com/api/delete-event-image/${imageId}`);  // Adjust API endpoint for image deletion

                if (response.status === 200) {
                    // Remove the image from state (UI)
                    setImages(images.filter(image => image._id !== imageId));
                    toast.success('Image deleted successfully');
                }
            } catch (error) {
                toast.error('Error deleting image');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Event Images</h4>
                </div>
                <div className="links">
                    <Link to="/add-event-image" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="3" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            images.map((image, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img src={`https://api.sofiasurgicals.com/${image.image}`} alt="Gallery" width="150" height="100" />
                                    </td>
                                    <td>
                                        <Link className="bt edit" to={`/edit-event-image/${image._id}`}>
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => deleteImage(image._id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllEventImage;
