import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBannerVedio = () => {
    const { id } = useParams(); // Get the video ID from URL
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [file, setFile] = useState(null); // For video file
    const [status, setStatus] = useState("False"); // For status checkbox
    const [preview, setPreview] = useState(null); // Video preview
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the video details on component mount
    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`https://api.sofiasurgicals.com/api/get-vedio/${id}`);
                console.log(response)
                const videoData = response.data;

                setStatus(videoData.status ? "True" : "False");
                setPreview(`https://api.sofiasurgicals.com/${videoData.vedio}`);
                setIsLoading(false);
            } catch (error) {
                toast.error('Error fetching video details.');
                setIsLoading(false);
            }
        };

        fetchVideoDetails();
    }, [id]);

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Show video preview
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setPreview(fileURL);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const formData = new FormData();
        if (file) formData.append('vedio', file); // Append only if a new file is selected
        formData.append('status', status);

        try {
            const response = await axios.put(`https://api.sofiasurgicals.com/api/update-vedio/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Banner video updated successfully!');
            navigate('/all-vedio');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update video.');
        } finally {
            setBtnLoading(false);
        }
    };

    // Handle status change
    const handleStatusChange = (e) => {
        setStatus(e.target.checked ? "True" : "False");
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Banner Video</h4>
                </div>
                <div className="links">
                    <Link to="/all-vedio" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="vedio" className="form-label">Upload Banner Video</label>
                            <input
                                type="file"
                                className="form-control"
                                id="vedio"
                                name="vedio"
                                accept="video/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Preview</label>
                            {preview ? (
                                <video width="100%" height="auto" controls>
                                    <source src={preview} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>No video selected</p>
                            )}
                        </div>

                        <div className="col-md-6 mt-5">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="status"
                                    checked={status === "True"}
                                    onChange={handleStatusChange}
                                />
                                <label htmlFor="status" className="form-check-label">Active Status</label>
                            </div>
                        </div>

                        <div className="col-12 text-center">
                            <button
                                type="submit"
                                className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                                disabled={btnLoading}
                            >
                                {btnLoading ? "Please Wait..." : "Update Video"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditBannerVedio;
