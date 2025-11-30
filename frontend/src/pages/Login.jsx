import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import Auth Context
import api from "../api"; // Your axios instance

const Login = () => {
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || null;

  const { login } = useContext(AuthContext);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage({
      text: `Password reset link sent to ${email}`,
      type: "success",
    });
    setShowForgotPassword(false);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check admin login first
      const adminRes = await api.post("/admin/auth/login", { email, password });
      if (adminRes.data.success) {
        const adminUser = adminRes.data.user;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("user", JSON.stringify(adminUser));
        login(adminUser);
        setMessage({ text: "Welcome Admin! Redirecting...", type: "success" });
        setTimeout(() => navigate("/admin"), 1000);
        return;
      }
    } catch (err) {
      // If admin login fails, proceed with normal user login
      console.log("Admin login failed or not admin:", err.response?.data?.msg || err.message);
    }

    // Normal user login
    try {
      const { data } = await api.post("/user/auth/login", { email, password });

      const userData = {
        name: data.user?.name || data.name || "User",
        email: data.user?.email || data.email || email,
        role: "user",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "user");
      localStorage.setItem("user", JSON.stringify(userData));

      login(userData); // instantly updates Navbar

      setMessage({
        text: "Login successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        if (fromPage === "/checkout") return navigate("/checkout");
        if (fromPage === "/plans") return navigate("/plans");
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage({
        text: error.response?.data?.msg || "Something went wrong. Try again later.",
        type: "danger",
      });
    }
  };

  return (
    <section
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #e8f5e9, #ffffff, #d4fcd1)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                {message.text && (
                  <Alert
                    variant={message.type}
                    className="text-center fw-semibold rounded-3"
                  >
                    {message.text}
                  </Alert>
                )}

                {!showForgotPassword ? (
                  <>
                    <div className="text-center mb-4">
                      <h3 className="fw-bold text-success">Welcome Back 📚</h3>
                      <p className="text-muted">
                        Log in to continue your journey with BookHeaven.
                      </p>
                    </div>

                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fw-semibold">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          className="py-2"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            className="py-2 pe-5"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i
                            className={`bi ${
                              passwordVisible
                                ? "bi-eye-slash-fill"
                                : "bi-eye-fill"
                            } position-absolute end-0 top-50 translate-middle-y me-3 text-success`}
                            style={{ cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          ></i>
                        </div>
                      </Form.Group>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Remember me"
                          className="text-muted"
                        />
                        <Button
                          variant="link"
                          className="text-success p-0 text-decoration-none small"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot Password?
                        </Button>
                      </div>

                      <div className="d-grid mt-3">
                        <Button
                          variant="success"
                          type="submit"
                          className="py-2 fw-semibold"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>

                    <p className="text-center mt-4 mb-0 text-muted">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-success fw-semibold"
                        state={{ from: fromPage }}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <h3 className="fw-bold text-success">Forgot Password 🔑</h3>
                      <p className="text-muted">
                        Enter your email to receive a password reset link.
                      </p>
                    </div>

                    <Form onSubmit={handleForgotPassword}>
                      <Form.Group
                        className="mb-3"
                        controlId="forgotPasswordEmail"
                      >
                        <Form.Label className="fw-semibold">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your registered email"
                          className="py-2"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <div className="d-grid mt-3">
                        <Button
                          variant="success"
                          type="submit"
                          className="py-2 fw-semibold"
                        >
                          Send Reset Link
                        </Button>
                      </div>

                      <div className="text-center mt-3">
                        <Button
                          variant="link"
                          className="text-success text-decoration-none"
                          onClick={() => setShowForgotPassword(false)}
                        >
                          ← Back to Login
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
