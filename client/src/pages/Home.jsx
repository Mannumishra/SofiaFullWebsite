import React, { useEffect, useState } from 'react';
import Homelogo from '../assets/images/homeimage.jpg';
import flag from '../assets/images/madeindia.png';
import iso from '../assets/images/iso1.png';
import fda from '../assets/images/imgfda.jpg';
import celogo from '../assets/images/ce.png';
import Products from '../components/Products';
import Aboutsection from '../components/Aboutsection';
import Testimonials from '../components/Testimonials';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FAQ from './FAQ';

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.sofiasurgicals.com/api/get-vedio');  // Replace with your API endpoint
        console.log(response)
        const filterData = response.data.filter((x) => x.status === "True")
        setVideos(filterData);
        setIsLoading(false);
      } catch (error) {
        // toast.error('Error fetching videos');
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);
  return (
    <>
      {/* Home Section */}
      <section className="homeSection">
        <div className="home-hero">
          <div className="container">
            <div className="row pt-5 home-hero">
              <div className="col-md-6">
                <div className="textSection">
                  <h1 className="h2Text">
                    Your Trusted Source for <br />
                    <span>
                      Quality Orthopedic <br />
                      Implants <span className='and'> & </span>Instruments
                    </span>
                  </h1>
                  <p>
                    Over 28 years of excellence in manufacturing,<br />
                    exporting, and supplying top-quality<br />
                    orthopedic trauma products globally.
                  </p>
                  <Link to='/OurProduct' className="btn btn-primary px-4 w-30">View Products → </Link>
                </div>
              </div>

              {/* <div className="col-md-6 text-center">
                    <img src={Homelogo} alt="Homelogo" className="img-fluid" style={{ height: '350px', width: "100%" }} />
                  </div> */}

              {/* Video Section */}
              <div className="col-md-6 text-center">
                <video src={`https://api.sofiasurgicals.com/${videos[0]?.vedio}`} alt="Home Video" className="img-fluid" style={{ height: '350px', width: '100%' }}
                  autoPlay loop muted />
              </div>
            </div>
          </div>
        </div>

        {/* Image Logo Section */}

        <div className="row mt-4">
          <div class="icon-container">
            <div class="icon-card">
              <img alt="Made in India logo with Indian flag colors and text 'Made in India'" src={flag} height="100" width="100" />
            </div>
            <div class="icon-card">
              <img alt="ISO logo with red text 'ISO' and a globe" src={iso} height="100" width="100" />
            </div>
            <div class="icon-card">
              <img alt="FDA approved logo with blue text 'FDA' and circular text 'FDA Approved'" src={fda} height="100" width="100" />
            </div>
            <div class="icon-card">
              <img alt="CE logo with red text 'CE' in a circle" src={celogo} height="100" width="100" />
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <div className="row mt-5 card-category">
          <div className="col-md-12 pt-4">
            <div className="explore-container">
              <div className="explore text-center">EXPLORE</div>
            </div>
            <h2 className="text-center pt-2 explorep" style={{ fontSize: '1.75rem', fontWeight: '700' }}>Discover Our Categories</h2>
          </div>
          <div className="col-md-12">
            <Products showOnlyActive={true} />
          </div>
        </div>

        {/* About Section */}
        <div className="row">
          <div className="col-md-12">
            <Aboutsection />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="row">
          <div className="col-md-12">
            <Testimonials />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <FAQ />
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;