const User = require('../models/User');
const Book = require('../models/Book');
const { z } = require('zod');

const purchaseBookSchema = z.object({
  bookId: z.string().min(1)
});

const purchaseBook = async (req, res) => {
  try {
    const { bookId } = purchaseBookSchema.parse(req.body);

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findById(req.user.id);
    user.purchasedBooks.push(book);
    await user.save();

    res.json(user.purchasedBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPurchasedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('purchasedBooks');
    res.json(user.purchasedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { purchaseBook, getPurchasedBooks };
