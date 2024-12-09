import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBannerVedio = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the videos on component mount
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://api.sofiasurgicals.com/api/get-vedio');  // Replace with your API endpoint
                setVideos(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.error('Error fetching videos');
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);


    // Delete video function
    const deleteVideo = async (videoId) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this video!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                // Delete the video from the backend
                const response = await axios.delete(`https://api.sofiasurgicals.com/api/delete-vedio/${videoId}`);

                if (response.status === 200) {
                    // Remove the video from state (UI)
                    setVideos(videos.filter(video => video._id !== videoId));
                    toast.success('Video deleted successfully');
                }
            } catch (error) {
                toast.error('Error deleting video');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Banner Video</h4>
                </div>
                <div className="links">
                    <Link to="/add-vedio" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>



            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Video</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            videos.map((video, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <video width="150" height="100" controls>
                                            <source src={`https://api.sofiasurgicals.com/${video.vedio}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </td>
                                    <td>{video.status === "True" ? "Ture" : "False"}</td>
                                    <td>
                                        <Link className="bt edit" to={`/edit-vedio/${video._id}`}>
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => deleteVideo(video._id)}>
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

export default AllBannerVedio;
