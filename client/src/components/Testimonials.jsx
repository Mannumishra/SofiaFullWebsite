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
        const response = await axios.get(
          "https://api.sofiasurgicals.com/api/all-textimonial"
        );
        console.log(response);
        const filterTestimonial = response.data.filter((x)=>x.activeStatus==="True")
        setTestimonials(filterTestimonial);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
        <h2
          className="text-center pt-2 exploreText"
          style={{ fontSize: "1.75rem", fontWeight: "700" }}
        >
          Testimonials That Reflect Our Success
        </h2>
      </div>

      <Slider {...settings} className="container testimonials-slider">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-text">
              <p>{testimonial.details}</p>
            </div>
            <div className="testimonial-author">
              <img
                src={`https://api.sofiasurgicals.com/${testimonial.image}`}
                alt={testimonial.name}
                className="author-image"
              />
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
}

export default Testimonials;
