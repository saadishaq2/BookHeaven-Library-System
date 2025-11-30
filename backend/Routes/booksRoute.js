import express from "express";
import upload from "../Middlewares/multer.js";
import Book from "../Models/booksSchema.js";

const router = express.Router();


router.post("/", upload.fields([{ name: "src" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { title, author, price, category, description } = req.body;

    if (!title || !author || !price || !category) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const imageFile = req.files?.src?.[0];
    const pdfFile = req.files?.pdf?.[0];

    const newBook = new Book({
      title,
      author,
      price,
      category,
      description,
      src: imageFile ? `/uploads/${imageFile.filename}` : "",
      pdfUrl: pdfFile ? `/uploads/${pdfFile.filename}` : "",
      isHiddenFromCart: false, 
    });

    await newBook.save();

    res.status(201).json({
      message: "✅ Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("❌ Error adding book:", error);
    res.status(500).json({ message: "Server error while adding book" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "🗑️ Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // ✅ optional: newest first
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
});


router.put("/toggle-hide/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Toggle visibility
    book.isHiddenFromCart = !book.isHiddenFromCart;
    await book.save();

    res.json({
      message: `Book ${book.isHiddenFromCart ? "hidden from" : "shown in"} cart successfully`,
      book,
    });
  } catch (error) {
    console.error("❌ Error toggling book visibility:", error);
    res.status(500).json({ message: "Server error while toggling visibility" });
  }
});

export default router;
