import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import api, { BASE_URL } from "../api"; // ⬅️ use api instance
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toastConfig = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#146c43",
      color: "#fff",
      borderRadius: "10px",
      fontWeight: "500",
    },
  };

  // Restrict Access to Admin Only
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      toast.error("🚫 Access denied! Admins only.", toastConfig);
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const [paymentRes, orderRes, bookRes] = await Promise.all([
        api.get("/payments"),
        api.get("/orders"),
        api.get("/booksData"),
      ]);
      setPayments(paymentRes.data || []);
      setOrders(orderRes.data || []);
      setBooks(bookRes.data || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      toast.error("❌ Failed to fetch admin data.", toastConfig);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("bookAdded", fetchData);
    return () => window.removeEventListener("bookAdded", fetchData);
  }, []);

  // Delete book by ID
  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/booksData/${id}`);
      setBooks((books) => books.filter((b) => b._id !== id));
      toast.success("✅ Book deleted successfully!", toastConfig);
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("❌ Error deleting book!", toastConfig);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await api.put(`/orders/${orderId}`, { status });
      console.log(res.data);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      toast.success("✅ Order status updated!", toastConfig);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("❌ Failed to update order.", toastConfig);
    }
  };

  // Hide/Unhide Book
  const handleToggleHide = async (id) => {
    try {
      const res = await api.put(`/booksData/toggle-hide/${id}`);
      const message = res.data?.book?.isHiddenFromCart
        ? "📕 Book hidden from cart!"
        : "📗 Book visible in cart!";
      toast.info(message, toastConfig);
      fetchData();
    } catch (error) {
      console.error("Error toggling book visibility:", error);
      toast.error("❌ Failed to toggle visibility!", toastConfig);
    }
  };

  return (
    <>
      <div
        className="d-flex"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        {/* Sidebar */}
        <div
          className="p-3 text-white shadow"
          style={{
            width: "250px",
            background: "linear-gradient(180deg, #22b0ccff 0%, #0b6e27ff 100%)",
            color: "#fff",
            minHeight: "100vh",
          }}
        >
          <h3 className="fw-bold mb-4 text-center">📚 Admin Panel</h3>
          <ul className="list-unstyled">
            {[
              { key: "dashboard", label: "Dashboard" },
              { key: "addBook", label: "Add Book" },
              { key: "manageBooks", label: "Manage Books" },
              { key: "payments", label: "Payment Details" },
              { key: "orders", label: "Order History" },
            ].map(({ key, label }) => (
              <li key={key}>
                <Button
                  className={`w-100 mb-2 fw-semibold ${
                    activeTab === key
                      ? "text-dark"
                      : "text-white bg-transparent border-0"
                  }`}
                  style={{
                    backgroundColor: activeTab === key ? "#fff" : "transparent",
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                  }}
                  onClick={() => setActiveTab(key)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      activeTab === key ? "#fff" : "#ffffff26")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      activeTab === key ? "#fff" : "transparent")
                  }
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="fw-bold text-success mb-4">Welcome, Admin 👋</h2>
              <p className="text-muted fs-5">
                Manage your books, check payments, and view order history here.
              </p>

              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card text-center shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Total Payments</h5>
                      <h3 className="fw-bold">{payments.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-center shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title text-success">Total Orders</h5>
                      <h3 className="fw-bold">{orders.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-center shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title text-info">Books Uploaded</h5>
                      <h3 className="fw-bold text-success">{books.length}</h3>
                      <Button
                        variant="success"
                        className="fw-semibold mt-2"
                        onClick={() => navigate("/library")}
                      >
                        View in Library
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Book */}
          {activeTab === "addBook" && (
            <div>
              <h3 className="text-success fw-bold mb-3">➕ Add New Book</h3>
              <BookForm
                onBookAdded={(newBook) =>
                  setBooks((prev) => [...prev, newBook])
                }
              />
            </div>
          )}

          {/* Manage Books */}
          {activeTab === "manageBooks" && (
            <div className="p-4 bg-light rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-success fw-bold m-0 d-flex align-items-center">
                  <i className="bi bi-book-half me-2"></i> Manage Books
                </h3>
                <span className="badge bg-success-subtle text-success fw-semibold">
                  Total Books: {books.length}
                </span>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle text-center shadow-sm rounded overflow-hidden">
                  <thead className="table-success text-dark">
                    <tr>
                      <th style={{ width: "25%" }}>📘 Title</th>
                      <th>✍️ Author</th>
                      <th>📚 Category</th>
                      <th>💰 Price</th>
                      <th>⚙️ Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length > 0 ? (
                      books.map((book, index) => (
                        <tr key={index} className="bg-white">
                          <td className="fw-semibold text-start">{book.title}</td>
                          <td>{book.author}</td>
                          <td>
                            <span className="badge bg-info-subtle text-info px-3 py-2">
                              {book.category}
                            </span>
                          </td>
                          <td className="fw-semibold text-success">Rs. {book.price}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="px-3"
                                onClick={() => handleDeleteBook(book._id)}
                              >
                                <i className="bi bi-trash3 me-1"></i> Delete
                              </Button>
                              <Button
                                variant={
                                  book.isHiddenFromCart ? "outline-success" : "outline-warning"
                                }
                                size="sm"
                                className="px-3"
                                onClick={() => handleToggleHide(book._id)}
                              >
                                <i
                                  className={
                                    book.isHiddenFromCart
                                      ? "bi bi-eye me-1"
                                      : "bi bi-eye-slash me-1"
                                  }
                                ></i>
                                {book.isHiddenFromCart ? "Show in Cart" : "Hide from Cart"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          <i className="bi bi-emoji-frown fs-4 me-2"></i> No books found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* Payments */}
          {activeTab === "payments" && (
            <div>
              <h3 className="text-primary fw-bold mb-3">💳 Payment Details</h3>
              <Table bordered hover responsive className="shadow-sm">
                <thead className="table-success">
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i}>
                      <td>{p.userName}</td>
                      <td>{p.plan}</td>
                      <td>{p.price}</td>
                      <td>{new Date(p.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h3 className="text-primary fw-bold mb-3">📦 Order History</h3>
              <Table bordered hover responsive className="shadow-sm">
                <thead className="table-success">
                  <tr>
                    <th>Book</th>
                    <th>Customer</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i}>
                      <td>{o.items.map((item) => item.title).join(", ")}</td>
                      <td>{o.customer.name}</td>
                      <td>Rs {o.totalPrice}</td>
                      <td>
                        <span
                          className={`badge ${
                            o.status === "Completed"
                              ? "bg-success"
                              : o.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {o.status}
                        </span>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateOrderStatus(o._id, e.target.value)
                          }
                          className="form-select form-select-sm mt-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default AdminDashboard;
