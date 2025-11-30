import React from "react";
import { useNavigate } from "react-router-dom";

function PlansSection() {
  const navigate = useNavigate();

  // Updated: handle plan + price
  const handleGetStarted = (planName, planPrice) => {
    localStorage.setItem("selectedPlan", planName); // store selected plan name
    localStorage.setItem("selectedPrice", planPrice); // store selected plan price

    const token = localStorage.getItem("token"); // check login status

    if (token) {
      navigate("/payment"); // if logged in, go directly to payment
    } else {
      navigate("/login", { state: { from: "/plans" } }); // otherwise, go to login first
    }
  };

  return (
    <section id="plans" className="plans-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Choose Your Reading Plan</h2>
          <p className="text-secondary mb-0">
            <strong>Flexible subscription options for every reader.</strong>
          </p>
        </div>

        <div className="row">
          {/* Basic Plan */}
          <div className="col-md-4 mb-4">
            <div className="pricing-card">
              <div className="text-center">
                <div className="plan-name">Basic</div>
                <div className="plan-price">$9.99<span>/month</span></div>
                <ul className="plan-features text-start">
                  <li><i className="fas fa-check"></i> Access to 5,000+ books</li>
                  <li><i className="fas fa-check"></i> Read on 1 device</li>
                  <li><i className="fas fa-check"></i> Basic recommendations</li>
                  <li><i className="fas fa-check"></i> Standard support</li>
                  <li><i className="fas fa-times text-muted"></i> Offline reading</li>
                </ul>
                <button
                  className="btn btn-plan btn-basic"
                  onClick={() => handleGetStarted("Basic", 9.99)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="col-md-4 mb-4">
            <div className="pricing-card featured">
              <span className="badge bg-success mb-2">Most Popular</span>
              <div className="text-center">
                <div className="plan-name">Standard</div>
                <div className="plan-price">$14.99<span>/month</span></div>
                <ul className="plan-features text-start">
                  <li><i className="fas fa-check"></i> Access to 25,000+ books</li>
                  <li><i className="fas fa-check"></i> Read on 3 devices</li>
                  <li><i className="fas fa-check"></i> Advanced recommendations</li>
                  <li><i className="fas fa-check"></i> Priority support</li>
                  <li><i className="fas fa-check"></i> Offline reading</li>
                </ul>
                <button
                  className="btn btn-plan btn-standard"
                  onClick={() => handleGetStarted("Standard", 14.99)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="col-md-4 mb-4">
            <div className="pricing-card">
              <div className="text-center">
                <div className="plan-name">Premium</div>
                <div className="plan-price">$19.99<span>/month</span></div>
                <ul className="plan-features text-start">
                  <li><i className="fas fa-check"></i> Access to all 50,000+ books</li>
                  <li><i className="fas fa-check"></i> Read on unlimited devices</li>
                  <li><i className="fas fa-check"></i> Personalized recommendations</li>
                  <li><i className="fas fa-check"></i> 24/7 dedicated support</li>
                  <li><i className="fas fa-check"></i> Offline reading</li>
                </ul>
                <button
                  className="btn btn-plan btn-premium"
                  onClick={() => handleGetStarted("Premium", 19.99)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlansSection;
