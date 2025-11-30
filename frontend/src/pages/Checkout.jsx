import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import { Container, Row, Col, Button, Form, Card, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Trash3 } from "react-bootstrap-icons";
import api from "../api";


const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const COD_CHARGE = 250;
  const [showForm, setShowForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    countryCode: "+92",
    phone: "",
  });

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [orderSummary, setOrderSummary] = useState(null);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const grandTotal = paymentMethod === "cod" ? totalPrice + COD_CHARGE : totalPrice;

  // Redirect to login if user not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setToast({
        show: true,
        message: "Please log in to proceed with checkout.",
        variant: "warning",
      });
      setTimeout(() => navigate("/login",{state: {from: "/checkout"}}), 2000);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleCardChange = (e) => setCardData({ ...cardData, [e.target.name]: e.target.value });

  const handleQuantityChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) updateQuantity(index, Number(value) || 1);
  };

  const handleDecrement = (index) => {
    const current = cart[index].quantity || 1;
    if (current > 1) updateQuantity(index, current - 1);
  };

  const handleIncrement = (index) => {
    const current = cart[index].quantity || 1;
    updateQuantity(index, current + 1);
  };

  const handleRemove = (index) => removeFromCart(index);

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (paymentMethod === "card") {
    const { cardName, cardNumber, expiry, cvv } = cardData;
    if (!cardName || !cardNumber || !expiry || !cvv) {
      setToast({ show: true, message: "Please fill all card details.", variant: "danger" });
      return;
    }
  }

  const orderData = {
    customer: { ...formData },
    items: [...cart],
    totalPrice: grandTotal,
    paymentMethod,
  };

  try {
    // POST order data to backend API
    await api.post("/orders", orderData);
  } catch (error) {
    console.error("Error saving order:", error);
    setToast({ show: true, message: "Failed to save order. Please try again.", variant: "danger" });
    return;
  }

  // Original logic preserved
  setOrderSummary(orderData);
  clearCart();
  setOrderPlaced(true);
  setToast({ show: true, message: "🎉 Order Placed Successfully!", variant: "success" });
};

  // SUCCESS PAGE
  if (orderPlaced && orderSummary) {
    return (
      <main style={{ flex: 1 }}>
        <Container className="py-5">
          <Card className="p-4 shadow-lg border-success">
            <Alert variant="success" className="text-center fw-bold fs-5">
              Order Placed Successfully!
            </Alert>
            <p className="text-center text-muted">
              Thank you for shopping with us, {orderSummary?.customer?.name || "Customer"}.
            </p>
            <hr />

            <Row className="mb-3">
              <Col md={6}>
                <h5 className="fw-bold text-success mb-3">Shipping Details</h5>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Name:</strong> {orderSummary?.customer?.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {orderSummary?.customer?.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Address:</strong> {orderSummary?.customer?.address}
                  </li>
                  <li className="list-group-item">
                    <strong>Phone:</strong> {orderSummary?.customer?.countryCode}{" "}
                    {orderSummary?.customer?.phone}
                  </li>
                </ul>
              </Col>

              <Col md={6}>
                <h5 className="fw-bold text-success mb-3">Order Summary</h5>
                <ul className="list-group mb-3">
                  {orderSummary?.items?.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span className="fw-semibold">{item.title}</span>
                        <small className="text-muted ms-2">× {item.quantity}</small>
                      </div>
                      <span className="fw-bold text-success">
                        Rs {item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="fw-bold fs-5 text-end text-success">
                  Grand Total: Rs {orderSummary?.totalPrice}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {orderSummary.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
                </p>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                variant="success"
                className="px-4"
                onClick={() => navigate("/product")}
              >
                🛒 Back to Products
              </Button>
            </div>
          </Card>
        </Container>

        {/* Toast */}
        <ToastContainer position="top-center" className="p-3">
          <Toast
            onClose={() => setToast({ ...toast, show: false })}
            show={toast.show}
            bg={toast.variant}
            delay={2000}
            autohide
          >
            <Toast.Body className="text-white fw-semibold text-center">
              {toast.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </main>
    );
  }

  // CHECKOUT FORM PAGE
  return (
    <main style={{ flex: 1 }}>
      <Container className="py-5">
        <h2 className="fw-bold text-success mb-4 text-center">Checkout</h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="lead">Your cart is empty.</p>
            <Button variant="success" onClick={() => navigate("/product")}>
              Go to Products
            </Button>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              <Col md={8}>
                {cart.map((item, index) => (
                  <Card key={index} className="mb-3 border-success shadow-sm rounded-3">
                    <Card.Body className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.src}
                          alt={item.title}
                          width="70"
                          className="rounded shadow-sm"
                        />
                        <div>
                          <h5 className="fw-semibold mb-1">{item.title}</h5>
                          <p className="mb-0 text-secondary small">{item.author}</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
                        <Button size="sm" variant="outline-success" onClick={() => handleDecrement(index)}>
                          −
                        </Button>
                        <Form.Control
                          type="text"
                          value={item.quantity || 1}
                          onChange={(e) => handleQuantityChange(e, index)}
                          className="text-center border-success"
                          style={{ width: "60px" }}
                        />
                        <Button size="sm" variant="outline-success" onClick={() => handleIncrement(index)}>
                          +
                        </Button>
                        <div className="fw-bold text-success">
                          Rs {item.price * (item.quantity || 1)}
                        </div>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleRemove(index)}
                        >
                          <Trash3 />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                ))}
              </Col>

              <Col md={4}>
                <Card className="border-success shadow-sm rounded-3">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Price Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>Rs {totalPrice}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="d-flex justify-content-between mb-2">
                        <span>COD Charges</span>
                        <span>Rs {COD_CHARGE}</span>
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Grand Total</span>
                      <span className="text-success">Rs {grandTotal}</span>
                    </div>
                    {!showForm && (
                      <Button
                        variant="success"
                        className="w-100 mt-3"
                        onClick={() => setShowForm(true)}
                      >
                        Proceed to Checkout
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {showForm && (
              <Card className="border-success shadow-sm mt-4 p-4 rounded-3">
                <h4 className="fw-bold text-success mb-3">Enter Your Details</h4>
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        style={{ maxWidth: 180 }}
                        required
                      >
                        <option value="+92">Pakistan (+92)</option>
                        <option value="+91">India (+91)</option>
                        <option value="+1">United States (+1)</option>
                        <option value="+44">United Kingdom (+44)</option>
                      </Form.Select>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{7,15}"
                        maxLength={15}
                        inputMode="numeric"
                        placeholder="Phone number"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="card">Card Payment</option>
                    </Form.Select>
                  </Form.Group>

                  {paymentMethod === "card" && (
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cardholder Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardChange}
                            required
                            pattern="[0-9]{16}"
                            title="Enter 16-digit card number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="month"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            required
                            pattern="[0-9]{3}"
                            title="Enter 3-digit CVV"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outline-success" onClick={() => navigate("/product")}>
                      ← Back to Products
                    </Button>
                    <Button variant="success" type="submit">
                      Place Order
                    </Button>
                  </div>
                </Form>
              </Card>
            )}
          </>
        )}
      </Container>

      {/* Toast Notification */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          bg={toast.variant}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white fw-semibold text-center">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </main>
  );
};

export default Checkout;
