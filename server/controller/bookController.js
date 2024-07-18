const Book = require('../models/Book');
const { z } = require('zod');

const bookSchema = z.object({
  name: z.string().min(1),
  author: z.string().min(1),
  publication: z.string().min(1),
  tags: z.array(z.string()),
  description: z.string().optional(),
  pictures: z.array(z.string().url())
});

const addBook = async (req, res) => {
    const start = Date.now()
  console.log("addBook invoked")
  try {
    const bookData = bookSchema.parse(req.body);
    const book = new Book(bookData);
    await book.save();
    console.log("addBook success")
    console.log("Time taken: ", Date.now() - start)
    res.status(201).json(book);
  } catch (error) {
    console.log("addBook failed")
    res.status(400).json({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updates = bookSchema.partial().parse(req.body);
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
