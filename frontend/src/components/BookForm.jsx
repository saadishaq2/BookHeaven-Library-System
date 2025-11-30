import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../api"

const BookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
  });

  const [file, setFile] = useState(null); // image
  const [pdfFile, setPdfFile] = useState(null); // PDF file

  const location = useLocation();
  if (location.pathname === "/") return null;

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle PDF upload
  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (file) data.append("src", file); // existing image upload
      if (pdfFile) data.append("pdf", pdfFile); // add PDF upload

      const response = await api.post("/booksData", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Book added:", response.data);

      // Notify parent (AdminDashboard) that a new book was added
      if (onBookAdded) onBookAdded(response.data.book);

      // Also tell frontend sections to refresh library + product data
      window.dispatchEvent(new Event("bookAdded")); // triggers updates in other components

      // Reset form
      setFormData({
        title: "",
        author: "",
        price: "",
        category: "",
        description: "",
      });
      setFile(null);
      setPdfFile(null);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book! Check the console for details.");
    }
  };

  return (
    <Card className="p-4 shadow-sm mb-5 border-0">
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (Rs)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Book Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
          {file && (
            <div className="mt-2 text-muted">
              Selected image: <strong>{file.name}</strong>
            </div>
          )}
        </Form.Group>

        {/* PDF Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Upload PDF File (Optional)</Form.Label>
          <Form.Control type="file" accept="application/pdf" onChange={handlePdfChange} />
          {pdfFile && (
            <div className="mt-2 text-muted">
              Selected PDF: <strong>{pdfFile.name}</strong>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100 fw-semibold">
          Add Book
        </Button>
      </Form>
    </Card>
  );
};

export default BookForm;
