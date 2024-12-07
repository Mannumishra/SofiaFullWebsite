import React, { useEffect, useState } from 'react';
import threads from '../assets/images/threads.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Instruments() {
    const [data, setData] = useState([])
    const { categoryName } = useParams()

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.sofiasurgicals.com/api/all-instupment")
            const filterData = res.data.data
            const filterIntrupment = filterData.filter((x) => x.categoryName.categoryName === categoryName)
            setData(filterIntrupment)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Instruments</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                data.length > 0 ?
                    <section className="implants">
                        <div className="container">
                            <div className="row mt-1 py-4 implants-card">
                                {data.map((instrument, index) => (
                                    <div className="col-md-3" key={index}>
                                        <div className="category-card">
                                            <Link to={`/instrument-details/${instrument.instupmentName}`}>
                                                <img alt={instrument.instupmentName} className="img-fluid" src={`https://api.sofiasurgicals.com/${instrument.instupmentImage}`} width="250" height="230" />
                                            </Link>
                                            <div className="category-title">
                                                {instrument.instupmentName}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> : <p className='text-uppercase mb-5 mt-5 text-center fs-2'>No Instruments found for this category.</p>
            }
        </>
    );
}

export default Instruments;
