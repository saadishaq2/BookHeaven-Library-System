import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ⬅️ using your axios instance

function PaymentForm() {
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaid(true);

    // Save payment info locally
    localStorage.setItem("hasPaid", "true");

    const selectedPlan = localStorage.getItem("selectedPlan") || "Unknown Plan";
    const selectedPrice = localStorage.getItem("selectedPrice") || "0";
    localStorage.setItem("paidPlan", selectedPlan);

    // Prepare data for backend
    const paymentData = {
      userName: localStorage.getItem("userName") || "Guest",
      plan: selectedPlan,
      price: selectedPrice,
      date: new Date().toISOString(),
      status: "Success",
    };

    try {
      await api.post("/payments", paymentData); // ⬅️ updated
      console.log("Payment saved to backend successfully!");
    } catch (error) {
      console.error("Error saving payment:", error);
    }

    setTimeout(() => {
      navigate("/library");
    }, 2500);
  };

  const planName = localStorage.getItem("selectedPlan") || "your plan";
  const planPrice = localStorage.getItem("selectedPrice") || "0";

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: "420px", borderRadius: "20px" }}
      >
        <div className="card-body p-4 text-center">
          {!paid ? (
            <>
              <h3 className="mb-3 text-primary fw-bold">BookHeaven Payment</h3>
              <p className="text-muted mb-4">
                Enter your card details to subscribe to{" "}
                <strong className="text-dark">{planName}</strong> for{" "}
                <strong className="text-success">Rs {planPrice}</strong>
              </p>

              <form onSubmit={handlePayment}>
                <div className="mb-3 text-start">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-6 mb-3 text-start">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="col-6 mb-3 text-start">
                    <label className="form-label">CVV</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="***"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  Pay Now
                </button>
              </form>
            </>
          ) : (
            <div className="mt-5">
              <h4 className="text-success fw-bold">Payment Successful!</h4>
              <p className="text-muted">
                You’ve successfully subscribed to{" "}
                <strong className="text-dark">{planName}</strong> (
                Rs {planPrice}).
                <br />
                Redirecting to your library...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
