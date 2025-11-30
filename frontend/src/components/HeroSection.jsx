import React from 'react';
import CarouselComponent from './CarouselComponent';

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center hero-content">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="text-secondary display-3 fw-bold mb-4">Discover Your Next Great Read</h1>
            <p className="lead text-secondary mb-6 ">
              <strong>Explore thousands of books across all genres. Subscribe to unlimited reading with our flexible plans designed for book lovers.</strong>
            </p>
            <button
              className="btn btn-cta"
              onClick={() => {
                const plansSection = document.getElementById('plans');
                if (plansSection) plansSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Reading Today <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </div>
          <div className="col-lg-6">
            <CarouselComponent />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
