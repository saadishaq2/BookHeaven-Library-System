import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../api"; // ⬅️ using your axios instance

function Library() {
  const navigate = useNavigate();
  const hasPaid = localStorage.getItem("hasPaid") === "true";
  const selectedPlan = localStorage.getItem("paidPlan") || "Your Plan";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!hasPaid) navigate("/payment");
  }, [hasPaid, navigate]);

  useEffect(() => {
    api
      .get("/booksData")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error loading books:", err));
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">📚 Your BookHeaven Library</h2>
        <p className="text-secondary">
          You’ve successfully subscribed to <strong>{selectedPlan}</strong>.{" "}
          Enjoy unlimited access to our digital collection!
        </p>
      </div>

      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-md-3 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${BASE_URL}${book.src}`}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "260px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{book.title}</h5>
                  <p className="text-muted mb-2">{book.author}</p>

                  {book.pdfUrl ? (
                    <a
                      href={`${BASE_URL}${book.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm"
                    >
                      Read Book
                    </a>
                  ) : (
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      No PDF Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Library;
