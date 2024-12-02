import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
// import customerImg from '../assets/images/customer-re.png';
import missionImg from "../assets/images/mission.png";
import fa110 from "../assets/images/fa110.jpeg";
import fa111 from "../assets/images/fa111.jpeg";
import fa112 from "../assets/images/fa112.jpeg";
import fa113 from "../assets/images/fa113.jpeg";
import fa114 from "../assets/images/fa114.jpeg";
import fa115 from "../assets/images/fa115.jpeg";
import { MdDiamond } from "react-icons/md";
import group from "../assets/images/00cfb8d7d1e59f2b9c0ee9e3307da7a2.png";
import earth from "../assets/images/earth.png";
import man from "../assets/images/man.png";
import axios from "axios";

function Aboutsection() {
  const [images, setImage] = useState();
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setCurrentImage(image);
    setShow(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          "https://api.sofia.assortsmachinetools.com/api/get-images"
        );
        setImage(res.data.images);
      } catch (error) {
        console.log(error, "image not found");
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <div className="about-section">
        <div className="container">
          <div className="row mt-4 pt-4">
            <div className="col-md-6">
              <div className="explore-container1 ">
                <div className="line"></div>
                <div className="explore1">ABOUT US</div>
              </div>
              <div className="aboutText">
                <h2 className="aboutHead">
                  Leading the Way in Orthopedic <br />
                  Innovation Since <span>2010</span>
                </h2>
                <p className="para">
                  Our Story Founded in 2010, Sofia Surgicals Pvt. Ltd. has been
                  at the forefront of orthopedic innovation. With a commitment
                  to improving patient outcomes, our team of experts
                  collaborates with leading surgeons and researchers to develop
                  cutting-edge orthopedic implants. Sofia has an experience of
                  27 years as a Manufacturer since 1996. The company is engaged
                  in manufacturing: Mini Fragment Plate, Small Fragment Plates,
                  Large Fragment Plates, Hip Prosthesis, DHS/DCS Plates, Bone
                  Screws , Locking Plates, Locking Screws , Intramedullary
                  Nails, Spine Implants, Pins- Wires-Drill-Bits, Fixator
                  Ilizarow &amp; Clamp and Power Tools as well as various
                  Orthopedicle Instruments. Our Manufacturing unit is based in
                  Delhi (INDIA). With the aim of serving patients and medical
                  fraternity across the global market, we are always committed
                  to provide the best products and services to ensure total
                  satisfaction of the clients. We provide our products in indian
                  competitive prices and overseas markets.
                </p>
              </div>
            </div>
            {/* <div className="col-md-6">
                            <img src={customerImg} className="aboutImg" alt="" width={'100%'} height={'520px'} />
                        </div> */}
            <div class="col-md-6 justify-content-center mb-5">
              <div class="d-flex justify-content-evenly align-items-center mb-4">
                <div
                  class="circle-icon text-center d-flex"
                  style={{
                    background: "#3496FF",
                    color: "#fff",
                    border: "5px solid white",
                  }}
                >
                  <div className="text-16">
                    <MdDiamond size={50} />
                    <h2>16 Years</h2>
                    <p>Experience</p>
                  </div>
                </div>
                <div
                  class="square-icon text-center d-flex"
                  style={{
                    background: "transparent",
                    border: "5px solid white",
                  }}
                >
                  <div className="text-16">
                    <img src={group} alt="" height={100} />
                    <h2>9000+</h2>
                    <p style={{ color: "#667085" }}>Customers</p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-evenly align-items-center">
                <div
                  style={{
                    background: "transparent",
                    border: "5px solid white",
                  }}
                  class="rectangle-icon text-center d-flex"
                >
                  <div className="text-16">
                    <img src={earth} alt="" height={100} />
                    <h2>140+</h2>
                    <p style={{ color: "#667085" }}>Countries</p>
                  </div>
                </div>
                <div
                  style={{
                    background: "transparent",
                    border: "5px solid white",
                  }}
                  class="rectangle-icon text-center d-flex"
                >
                  <div className="text-16">
                    <img src={man} alt="" height={100} />
                    <h2>26663+</h2>
                    <p style={{ color: "#667085" }}>Surgeries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="globe-search">
        <div className="container">
          <div className="row pt-5 mt-2">
            <div className="col-md-6">
              <div className="explore-container1">
                <div className="line"></div>
                <div className="explore1">GLOBAL REACH</div>
              </div>
              <h2 className="headh2">
                Expansive Network Serving Over 40 Countries Worldwide
              </h2>
            </div>
            <div className="col-md-6 pb-4">
              <p className="Globalpara">
                We have a well-spread business network extending to various
                parts of India and across Africa, South Asia, Middle East and
                Central Asia. Currently we are exporting our products to more
                than forty countries across the globe. We are successfully
                catering to the needs of medical fraternity, medical colleges,
                hospitals and pharmaceutical companies in these regions.
              </p>
            </div>
          </div>
          <div
            className="row p-2"
            style={{
              background: "#fff",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          >
            <div className="col-md-3">
              <img
                src={fa110}
                alt=""
                onClick={() => handleShow(fa110)}
                className="pt-3"
                height={"400px"}
                width={"100%"}
                style={{
                  borderRadius: "6px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-md-3">
              <div>
                <img
                  src={fa111}
                  alt=""
                  className="pt-3"
                  onClick={() => handleShow(fa111)}
                  height={"200px"}
                  width={"100%"}
                  style={{
                    borderRadius: "6px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <img
                  src={fa112}
                  alt=""
                  onClick={() => handleShow(fa112)}
                  className="pt-3"
                  height={"200px"}
                  width={"100%"}
                  style={{
                    borderRadius: "6px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <img
                  src={fa113}
                  alt=""
                  className="pt-3"
                  onClick={() => handleShow(fa113)}
                  height={"200px"}
                  width={"100%"}
                  style={{
                    borderRadius: "6px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <img
                  src={fa114}
                  alt=""
                  onClick={() => handleShow(fa114)}
                  className="pt-3"
                  height={"200px"}
                  width={"100%"}
                  style={{
                    borderRadius: "6px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <img
                src={fa115}
                alt=""
                className="pt-3"
                onClick={() => handleShow(fa115)}
                height={"400px"}
                width={"100%"}
                style={{
                  borderRadius: "6px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <img
                src={currentImage}
                alt="Selected"
                width="100%"
                height="380px"
              />
            </Modal.Body>
          </Modal>
          <div className="row mt-4 mb-4">
            <div className="col-md-8">
              <div className="ourMission">
                <h2 className="mission">Vision & Mission</h2>
                <p className="missionPara">
                  Our mission is to enhance the quality of life for patients
                  through advanced orthopedic solutions. We envision a world
                  where everyone can achieve optimal mobility and functionality,
                  free from the limitations of musculoskeletal disorders.
                </p>
                <p className="name">Simrat Kaur</p>
                <p className="position">Founder of Sofia</p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={missionImg}
                className="missionImg"
                alt="missionImg"
                height={"300px"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutsection;
