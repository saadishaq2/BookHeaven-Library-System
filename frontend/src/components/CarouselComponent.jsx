import React from 'react';

function CarouselComponent() {
  return (
    <div className="col-lg-6">
            <div
              id="carouselExampleCaptions"
              className="carousel slide carousel-container"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./Images/photo-1512820790803-83ca734da794.jpeg"
                    className="carousel-image d-block w-100"
                    alt="Books Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./Images/photo-1512820790803-83ca734da794.jpeg"
                    className="carousel-image d-block w-100"
                    alt="Books Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./Images/photo-1512820790803-83ca734da794.jpeg"
                    className="carousel-image d-block w-100"
                    alt="Books Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./Images/photo-1512820790803-83ca734da794.jpeg"
                    className="carousel-image d-block w-100"
                    alt="Books Collection"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./Images/photo-1512820790803-83ca734da794.jpeg"
                    className="carousel-image d-block w-100"
                    alt="Books Collection"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
  );
}

export default CarouselComponent;