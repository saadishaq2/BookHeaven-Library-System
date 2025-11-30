import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthContext"; 
import { Badge } from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavbarHeader() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("userRole") === "admin"
  );

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      if (user.role === "admin" || localStorage.getItem("userRole") === "admin") {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [user]);

  // Logout Function (with Toast)
  const handleLogout = () => {
    logout(); // clears AuthContext + localStorage

    toast.dismiss(); // clears old toast so autoClose works perfectly

    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1500,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/");
    }, 1600);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light shadow-sm"
        id="navbar"
      >
        <div className="container-fluid">
          <h2 className="navbar-brand fw-bold text-success">BookHaven</h2>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/plans">
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              {isAdmin && (
                <li className="nav-item ms-2">
                  <Link
                    to="/admin"
                    className="btn btn-outline-danger fw-semibold px-3 py-1"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}

              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

              <li className="nav-item ms-3 position-relative">
                <Link className="nav-link position-relative" to="/checkout">
                  <CartFill size={22} className="text-success" />
                  {cart.length > 0 && (
                    <Badge
                      bg="success"
                      pill
                      className="position-absolute top-0 start-100 translate-middle px-3 py-2 fw-bold shadow-sm border border-light"
                      style={{
                        fontSize: "0.9rem",
                        transform: "translate(-20%, -60%)",
                      }}
                    >
                      {cart.length}
                    </Badge>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Toast Notification Container */}
      <ToastContainer 
        position="top-center" 
        autoClose={1500} 
        pauseOnHover={false}   
      />
    </>
  );
}

export default NavbarHeader;
