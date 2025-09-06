const Book = require('../models/Book');

// Create book
exports.createBook = async (req, res) => {
  try {
    const { title, author, category, publishedDate, totalCopies } = req.body;
    if (!title || !author || !category) {
      return res.status(400).json({ message: 'Title, author, and category are required' });
    }
    const book = new Book({
      title,
      author,
      category,
      publishedDate,
      totalCopies,
      availableCopies: totalCopies,
    });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, publishedDate, totalCopies } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.publishedDate = publishedDate || book.publishedDate;
    if (totalCopies) {
      // Adjust availableCopies accordingly
      const diff = totalCopies - book.totalCopies;
      book.totalCopies = totalCopies;
      book.availableCopies += diff;
      if (book.availableCopies < 0) book.availableCopies = 0;
    }
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};