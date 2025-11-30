import React, { useState } from "react";


function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <div className="row align-items-start g-4">

          {/* LEFT SIDE - Contact Info */}
          <div className="col-lg-6 text-secondary position-relative">
            <div className="p-3">
              <h2 className="display-4 fw-bold mb-4">Get In Touch</h2>
              <p className="lead mb-4">
                <strong>
                  Have questions about our plans or need help getting started?
                  <br />
                  We're here to assist you in your Reading.
                </strong>
              </p>

              <div className="mb-3">
                <i className="fas fa-envelope me-3"></i>
                <span>support@bookhaven.com</span>
              </div>
              <div className="mb-3">
                <i className="fas fa-phone me-3"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="mb-3">
                <i className="fas fa-map-marker-alt me-3"></i>
                <span>123 Reading Street, Book City, BC 12345</span>
              </div>

              {/* Map visible only on laptop/desktop */}
              <div className="d-none d-lg-block mt-4">
                <iframe
                  title="Islamabad Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.1571725730323!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95638e0a5dff%3A0x83c44fdf06f1e7e8!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1698100000000!5m2!1sen!2s"
                  width="90%"
                  height="250"
                  style={{
                    border: 0,
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="col-lg-6">
            <div className="contact-form shadow-sm p-4 rounded-3 bg-white">
              <h3
                className="mb-4 text-center"
                style={{ color: "var(--secondary-green)" }}
              >
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-submit">
                    Send Message <i className="fas fa-paper-plane ms-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
