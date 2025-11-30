import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Book price is required"],
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    src: {
      type: String, // Book cover image path
      default: "",
    },
    pdfUrl: {
      type: String, // Path to uploaded PDF file
      default: "",
    },
    description: {
      type: String,
      trim: true,
    },
    isHiddenFromCart: {
    type: Boolean,
    default: false,
  },
    
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
