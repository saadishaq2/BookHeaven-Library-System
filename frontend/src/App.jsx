import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavbarHeader from "./components/NavbarHeader";
import HeroSection from "./components/HeroSection";
import CartSection from "./components/CartSection";
import AboutSection from "./components/AboutSection";
import TopicsSection from "./components/TopicsSection";
import PlansSection from "./components/PlansSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext"; // Add this
import PaymentForm from "./components/PaymentForm";
import Library from "./components/Library";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Checkout from "./pages/Checkout";

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/") {
    return (
      <>
        <NavbarHeader />
        <HeroSection />
        <PlansSection />
        <ReviewsSection />
        <TopicsSection />
        <ContactSection />
        <Footer />
      </>
    );
  }

  const minimalPages = ["/checkout", "/contact", "/login", "/signup", "/payment", "/library"];
  if (minimalPages.includes(path)) {
    let MainComponent = null;
    if (path === "/checkout") MainComponent = <Checkout />;
    else if (path === "/contact") MainComponent = <ContactSection />;
    else if (path === "/login") MainComponent = <Login />;
    else if (path === "/signup") MainComponent = <Signup />;
    else if (path === "/payment") MainComponent = <PaymentForm />;
    else if (path === "/library") MainComponent = <Library />;

    return (
      <>
        <NavbarHeader />
        {MainComponent}
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarHeader />
      <Routes>
        <Route path="/about" element={<AboutSection />} />
        <Route path="/product" element={<CartSection />} />
        <Route path="/plans" element={<PlansSection />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>     {/* Wrap the entire app here */}
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
