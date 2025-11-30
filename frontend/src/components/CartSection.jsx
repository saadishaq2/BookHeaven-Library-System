import React, { useState, useEffect } from "react";
import api, {BASE_URL} from "../api"
import BooksCard from "./BooksCard";
import { Form } from "react-bootstrap";


const CartSection = () => {
  const [cart, setCart] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = () => {
    api
      .get("/booksData")
      .then((response) => {
        const visibleBooks = response.data.filter(
          (book) => !book.isHiddenFromCart
        );
        setCart(visibleBooks);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchBooks(); // initial load
    const refreshData = () => fetchBooks();
    window.addEventListener("bookAdded", refreshData);
    return () => window.removeEventListener("bookAdded", refreshData);
  }, []);

  const filteredBooks = cart.filter((book) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerSearch) ||
      book.author.toLowerCase().includes(lowerSearch)
    );
  });

  const handleViewAll = () => setVisibleCount(filteredBooks.length);

  return (
    <section id="products" className="py-5" style={{ backgroundColor: "var(--light-bg)" }}>
      <div className="container">
        <div className="text-center mb-4 mx-auto section-heading">
          <div className="section-title">Our Products</div>
          <h2 className="display-6 fw-bold mt-1">Wholesome Books Selections</h2>
          <p className="text-secondary mb-0">
            <strong>Choose your favorite and delightful topic.</strong>
          </p>
        </div>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-5">
          <div className="position-relative" style={{ width: "100%", maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="Search by book or author name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 ps-4 pe-5 rounded-pill shadow-sm"
              style={{ border: "1px solid #ccc", fontSize: "1rem" }}
            />
            <i
              className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-success"
              style={{ cursor: "pointer", fontSize: "1.1rem" }}
            ></i>
          </div>
        </div>

        {/* Render Filtered Cards */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {filteredBooks.slice(0, visibleCount).map((book) => (
            <BooksCard
              key={book.id}
              src={book.src}
              alt={book.title}
              title={book.title}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>

        {/* View All */}
        {visibleCount < filteredBooks.length && (
          <div className="text-center mt-4">
            <button className="btn btn-success px-4 py-2 fw-semibold" onClick={handleViewAll}>
              View All
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center text-muted mt-4">
            <i className="bi bi-emoji-frown fs-4"></i>
            <p className="mt-2">No books found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartSection;
