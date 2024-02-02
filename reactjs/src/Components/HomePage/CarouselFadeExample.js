import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselFadeExample() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/get-all-Car")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {blogs.length > 0 ? (
        <Carousel fade={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={blogs[0].picture}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{blogs[0].title}</h3>
              <p>{blogs[0].snippet}.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={blogs[1].picture}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>{blogs[1].title}</h3>
              <p>{blogs[1].snippet}.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={blogs[2].picture}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>{blogs[2].title}</h3>
              <p>{blogs[2].snippet}.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CarouselFadeExample;