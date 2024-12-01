
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";


function Testimonials() {

  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    // Fetch testimonials from the API
    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/all-textimonial");
          console.log(response)
          setTestimonials(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching testimonials:", error);
          setIsLoading(false);
        }
      };
  
      fetchTestimonials();
    }, []);
  // const testimonials = [
  //   {
  //     id: 1,
  //     text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  //     name: "Andrew Wilkins",
  //     position: "Managing Director, Yess Company",
  //     image: "https://via.placeholder.com/50",
  //   },
  //   {
  //     id: 2,
  //     text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  //     name: "Daisy Phelps",
  //     position: "Digital Marketing Director, Monatc",
  //     image: "https://via.placeholder.com/50",
  //   },
  //   {
  //     id: 3,
  //     text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  //     name: "John Doe",
  //     position: "CEO, XYZ Inc.",
  //     image: "https://via.placeholder.com/50",
  //   },
  //   {
  //     id: 4,
  //     text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  //     name: "Jane Smith",
  //     position: "CTO, ABC Corp.",
  //     image: "https://via.placeholder.com/50",
  //   },
  // ];

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials">
      <div className="container py-2">
        <div className="explore-container">
          <div className="explore">TESTIMONIALS</div>
        </div>
        <h2 className="text-center pt-2 exploreText" style={{ fontSize: '1.75rem', fontWeight: '700' }}>Testimonials That Reflect Our Success</h2>
      </div>

      <Slider {...settings} className="container testimonials-slider">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-text">
              <p>{testimonial.details}</p>
            </div>
            <div className="testimonial-author">
              <img src={`http://localhost:8000/${testimonial.image}`} alt={testimonial.name} className="author-image" />
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
