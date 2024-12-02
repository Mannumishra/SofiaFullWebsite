import React, { useState } from 'react';
import contactImg from '../assets/images/contact-re.png';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    email: '',
    country: '',
    city: '',
    subject: '',
    message: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.sofia.assortsmachinetools.com/api/send-contact', formData);
      Swal.fire('Success', 'Contact request submitted successfully!', 'success');
      setFormData({
        name: '',
        profession: '',
        email: '',
        country: '',
        city: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire('Error', 'Failed to submit dealership request. Please try again.', 'error');
    }
  };

  return (
    <>
      <section className="contact-section" style={{ background: 'linear-gradient(180deg, #CEE5FD, #FFFFFF)' }}>
        <div className="container py-5">
          <div className="row">
            <div className="Contact_form d-flex p-4">
              <div className="col-md-6">
                <div className="contact2 mx-5">Contact Us</div>
                <h2>Get In Touch</h2>
                <p className="pe-5">Sofia Surgicals is the one of the most sold brand in the Indian Orthopedic market. We have very wide range of </p>
                <div className="imgSection">
                  <img src={contactImg} alt="Contact Us" height={300} />
                </div>
              </div>

              <div className="col-md-6 pt-2">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col mb-4">
                      <input type="text" name="name" className="form-control" placeholder="Your name*" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col mb-4">
                      <input type="email" name="email" className="form-control" placeholder="Email*" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-4">
                      <input type="text" name="country" className="form-control" placeholder="Country*" value={formData.country} onChange={handleChange} required />
                    </div>
                    <div className="col mb-4">
                      <input type="text" name="city" className="form-control" placeholder="City*" value={formData.city} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-4">
                      <input type="text" name="profession" className="form-control" placeholder="Your Profession*" value={formData.profession} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-4">
                      <input type="text" name="subject" className="form-control" placeholder="Subject*" value={formData.subject} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-4">
                      <textarea className="form-control" name="message" rows="3" placeholder="Your Message*" value={formData.message} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col mb-4">
                      <button type="submit" className="btn btn-primary px-4 w-30">Submit <span className="ms-2">→</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-2 mb-5">
          <div className="row px-3 px-md-5">
            <div className="col-md-4 mb-4">
              <div className="contact-card p-4 text-center h-100">
                <FaPhone className="mb-3 faIcon" size={50} />
                <p className="mb-1">+91-9015555501</p>
                <p>+91-11-41414592</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact-card p-4 text-center h-100">
                <FaEnvelope className="mb-3 faIcon" size={50} />
                <p className="mb-1">sofiasurgicals@gmail.com</p>
                <p>exports@sofiasurgicals.com</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact-card p-4 text-center h-100">
                <FaMapMarkerAlt className="mb-3 faIcon" size={50} />
                <p>Regd. Office: 3965/224, 2nd floor City Market, Ajmeri Gate, Delhi-110006 (INDIA)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
