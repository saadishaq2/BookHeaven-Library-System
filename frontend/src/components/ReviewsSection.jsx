import React from 'react';

function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">What Our Readers Say</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="review-card text-center">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Sarah Johnson" className="reviewer-img" />
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="mt-3">"BookHaven has transformed my reading habits! The vast collection and seamless experience make it my go-to platform for all genres."</p>
              <div className="reviewer-name">Sarah Johnson</div>
              <small className="text-muted">Premium Member</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review-card text-center">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Michael Chen" className="reviewer-img" />
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="mt-3">"The recommendations are spot-on! I've discovered so many amazing books I wouldn't have found otherwise. Worth every penny!"</p>
              <div className="reviewer-name">Michael Chen</div>
              <small className="text-muted">Standard Member</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review-card text-center">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" alt="Emily Parker" className="reviewer-img" />
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="mt-3">"Perfect for busy professionals! I can switch between devices and pick up exactly where I left off. The offline feature is a lifesaver."</p>
              <div className="reviewer-name">Emily Parker</div>
              <small className="text-muted">Basic Member</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;