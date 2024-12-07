import React, { useEffect, useState } from 'react';
import threads from '../assets/images/threads.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Implants() {
    const [data, setData] = useState([])
    const { categoryName } = useParams()

    console.log(categoryName)

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.sofiasurgicals.com/api/all-inplants")
            const filterData = res.data.data
            const filterInplants = filterData.filter((x) => x.categoryName.categoryName === categoryName)
            setData(filterInplants)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [categoryName])

    return (
        <>
            <section className="implants">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ourproduct">
                                <h2 className="product">Implants</h2>
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
                                {data.map((implant, index) => (
                                    <div className="col-md-3" key={index}>
                                        <div className="category-card">
                                            <Link to={`/inplants-details/${implant.inplantsName}`} className='text-decoration-none'>
                                                <img alt={implant.inplantsName} className="img-fluid" src={`https://api.sofiasurgicals.com/${implant.inplantsImage}`} width="250" height="230" />
                                                <div className="category-title  text-dark">
                                                    {implant.inplantsName}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> : <p  className='text-uppercase mb-5 mt-5 text-center fs-2'>No implants found for this category.</p>
            }
        </>
    );
}

export default Implants;
