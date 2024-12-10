import React from "react";
import AboutImg from "../assets/images/aboutpic-re.png";
import { FaEnvelope } from "react-icons/fa";
import missionImg from "../assets/images/mission.png";
import customerImg from "../assets/images/customer-re.png";
import { MdDiamond } from "react-icons/md";
import group from "../assets/images/00cfb8d7d1e59f2b9c0ee9e3307da7a2.png";
import earth from "../assets/images/earth.png";
import man from "../assets/images/grothimage.png";

function About() {
  // cardData Data Array
  const cardData = [
    {
      title: "Manufacturing Excellence",
      text: "Our manufacturing processes adhere to the highest industry standards. We employ precision engineering and rigorous quality control measures to produce implants that meet or exceed regulatory requirements.",
    },
    {
      title: "Research and Development",
      text: "At Sofia Surgicals Pvt. Ltd., innovation drives our R&D efforts. Our state-of-the-art laboratories and partnerships with leading medical institutions enable us to pioneer new technologies and materials that enhance the performance and safety of our implants.",
    },
    {
      title: "Clinical Evidence",
      text: "Our implants are backed by extensive clinical research and trials. We continuously monitor post-market performance to gather real-world data and refine our products based on patient outcomes. We believe that the best products come from close collaboration with surgeons. By working together, we gain valuable insights into surgical techniques and patient needs, driving the continuous improvement of our implants.",
    },
    {
      title: "Material Science",
      text: "We utilize advanced materials such as titanium, medical-grade stainless steel, and biocompatible material to ensure our implants are both strong and compatible with the human body. Our coatings and surface treatments promote osseointegration and reduce the risk of infection.",
    },
  ];

  const Card = ({ title, text }) => (
    <div className="col-md-6 pt-4">
      <div className="CardText">
        <div className="card-body text-center">
          <div className="mb-2 fs-2">
            <FaEnvelope style={{ color: "#3496FF" }} />
          </div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text" style={{ fontSize: ".9rem" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section
        className="homeSection"
        style={{
          background: "linear-gradient(180deg, #CEE5FD 0%, #FFFFFF 100%)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 pt-5">
              <div className="textSection">
                <h2 className="h2Text">
                  Your Trusted Source for <br />
                  <span>
                    Quality Orthopedic <br />
                    Implants <span className="and"> & </span> Instruments
                  </span>
                </h2>
                <p>
                  Over 28 years of excellence in manufacturing,
                  <br />
                  exporting, and supplying top-quality
                  <br />
                  orthopedic trauma products globally.
                </p>
                <button type="submit" className="btn btn-primary px-4 w-30">
                  View Products →{" "}
                </button>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={AboutImg}
                alt="AboutImg"
                className="img-fluid"
                style={{ height: "400px", width: "90%" }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="explore-container">
          <div className="explore text-center">BENEFITS</div>
        </div>
        <h2
          className="text-center pt-1 explorep"
          style={{ fontSize: "1.75rem", fontWeight: "700" }}
        >
          How We Are Your Trusted Partner?
        </h2>

        <div className="container mb-5">
          <div className="row">
            {cardData.map((card, index) => (
              <Card key={index} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="aboutSection mt-3"
        style={{ background: "linear-gradient(180deg, #CEE5FD, #FFFFFF 100%)" }}
      >
        <div className="container pt-3 mb-3">
          <div className="row">
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
                  Our Story <br /> Founded in 2010, Sofia Surgicals Pvt. Ltd. has been at the forefront of orthopedic innovation. With a commitment to improving patient outcomes, our team of experts collaborates with leading surgeons and researchers to develop cutting-edge orthopedic implants. Sofia has an experience of 28 years as a Manufacturer since 1996. The company is engaged in manufacturing; Mini Fragment Plate, Small Fragment Plates, Large Fragment Plates, Hip Prosthesis, DHS/DCS Plates, Bone Screws , Locking Plates, Locking Screws , Intramedullary Nails, Spine Implants, Pins- Wires-Drill-Bits, Fixator Illizarow & Clamp and Power Tools as well as various Orthopedicle Instruments. Our Manufacturing unit is based in Delhi (INDIA). With the aim of serving patients and medical fraternity across the globe, we are always committed to provide the best products and services to ensure total satisfaction of the clients.
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
                    <h2>28 Years</h2>
                    <p>Experience</p>
                  </div>
                </div>
                <div
                  style={{
                    background: "transparent",
                    border: "5px solid white",
                  }}
                  class="square-icon text-center d-flex"
                >
                  <div className="text-16">
                    <img src={group} alt="" height={100} />
                    <h2>7500+</h2>
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
                    <h2>18+</h2>
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
                    <img src={man} alt="" height={60} />
                    <h2>Best</h2>
                    <p className="about-icon-content" style={{ color: "#667085"}}>We are proud to be recognized as one of India's leading orthopedic manufacturing companies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-8">
            <div className="ourMission">
              <h2 className="mission">Vision & Mission</h2>
              <p className="missionPara">
                Our mission is to enhance the quality of life for patients
                through advanced orthopedic solutions. We envision a world where
                everyone can achieve optimal mobility and functionality, free
                from the limitations of musculoskeletal disorders.
              </p>
              {/* <p className="name">Simrat Kaur</p>
                            <p className="position">Founder of Sofia</p> */}
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
    </>
  );
}

export default About;
