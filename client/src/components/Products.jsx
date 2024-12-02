import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Products({ showOnlyActive = false }) { // Accept showOnlyActive prop with a default value of false
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const location = useLocation();
    
    const searchQuery = new URLSearchParams(location.search).get('search');

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.sofia.assortsmachinetools.com/api/get-all-category");
            console.log(res)
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    useEffect(() => {
        let filtered = data;

        // Apply status filter if showOnlyActive is true
        if (showOnlyActive) {
            filtered = filtered.filter(product => product.categoryStatus === "True");
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [searchQuery, data, showOnlyActive]);

    return (
        <div className="container">
            <div className="row py-4">
                {filteredData.length > 0 ? (
                    filteredData.map((product, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="category-card">
                                <img alt={product.alt} className="img-fluid" src={`https://api.sofia.assortsmachinetools.com/${product.categoryImage}`} width="250" height="230" />
                                <div className="category-title">
                                    {product.categoryName}
                                </div>
                                <div className="btn-group">
                                    <Link to={`/Implants/${product.categoryName}`}>
                                        <button className="btn btn-primary btn2">
                                            Implants
                                        </button>
                                    </Link>
                                    <Link to={`/Instruments/${product.categoryName}`}>
                                        <button className="btn btn-primary btn1">
                                            Instruments
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <h3>No products found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
