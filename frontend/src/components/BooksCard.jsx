import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { Button, Alert } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Use BASE_URL from your api.js (no changes in api.js)
import { BASE_URL } from '../api';

const BooksCard = ({ src, alt, title, author, price }) => {
  const { addToCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // ✅ Updated: Uses BASE_URL instead of hardcoded localhost
  const imageURL = src?.startsWith('/uploads')
    ? `${BASE_URL}${src}`          // backend uploaded image
    : src;                         // external/static image

  const handleAddToCart = () => {
    const book = { src: imageURL, title, author, price };
    addToCart(book);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div
      className="col d-flex flex-column align-items-center"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div
        className="card h-100 border-0 rounded-4 shadow bg-light p-3 w-100"
        style={{ maxWidth: '300px' }}
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        {/* Book image */}
        <img
          src={imageURL}
          className="card-img-top rounded-top-4"
          alt={alt || title}
          style={{ height: '250px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column text-center">
          <h3 className="h5 fw-semibold" data-aos="fade-down">
            {title}
          </h3>
          <p className="text-secondary flex-grow-1" data-aos="fade-up">
            {author}
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <span className="price-badge">Rs {price}</span>
            <Button variant="success" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Success message */}
      <div style={{ height: '40px', marginTop: '10px' }}>
        {showMessage && (
          <Alert
            variant="success"
            className="p-2 text-center mb-0 w-100 shadow-sm"
            data-aos="fade-in"
          >
            Book added to your cart!
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BooksCard;
