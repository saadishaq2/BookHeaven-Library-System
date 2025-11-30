import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Store Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Signup to Backend
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/auth/register", formData);

      const data = await res.json();

      if (!res.ok) {
        setMessage({ text: data.msg || "Signup failed!", type: "danger" });
        return;
      }

      setMessage({
        text: "Signup successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        setMessage({ text: "", type: "" });
        navigate("/plans");
      }, 2000);
      
    } catch (error) {
      setMessage({ text: "Server error! Try again later.", type: "danger", error });
    }
  };

  return (
    <section
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #d4fcd1, #e8f5e9, #ffffff)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                
                {message.text && (
                  <Alert variant={message.type} className="text-center fw-semibold rounded-3">
                    {message.text}
                  </Alert>
                )}

                <div className="text-center mb-4">
                  <h3 className="fw-bold text-success">Join BookHeaven</h3>
                  <p className="text-muted">Create your account and start your reading journey today!</p>
                </div>

                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      className="py-2"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="py-2"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Create password"
                        className="py-2 pe-5"
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <i
                        className={`bi ${passwordVisible ? "bi-eye-slash-fill" : "bi-eye-fill"} position-absolute end-0 top-50 translate-middle-y me-3 text-success`}
                        style={{ cursor: "pointer", fontSize: "1.1rem" }}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      ></i>
                    </div>
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button variant="success" type="submit" className="py-2 fw-semibold">
                      Sign Up
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-4 mb-0 text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-success fw-semibold">
                    Login
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
