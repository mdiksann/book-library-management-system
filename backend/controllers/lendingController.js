const Lending = require('../models/Lending');
const Book = require('../models/Book');

// Get all lendings
exports.getLendings = async (req, res) => {
  try {
    const lendings = await Lending.find().populate('book');
    res.json(lendings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create lending (borrow book)
exports.createLending = async (req, res) => {
  try {
    const { book, borrowerName } = req.body;
    if (!book || !borrowerName) return res.status(400).json({ message: 'Book and borrowerName are required' });

    const bookDoc = await Book.findById(book);
    if (!bookDoc) return res.status(404).json({ message: 'Book not found' });
    if (bookDoc.availableCopies < 1) return res.status(400).json({ message: 'No available copies' });

    // Reduce availableCopies by 1
    bookDoc.availableCopies -= 1;
    await bookDoc.save();

    const lending = new Lending({ book, borrowerName });
    const savedLending = await lending.save();
    res.status(201).json(savedLending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lending (e.g., mark returned)
exports.updateLending = async (req, res) => {
  try {
    const lending = await Lending.findById(req.params.id);
    if (!lending) return res.status(404).json({ message: 'Lending not found' });
    if (req.body.status === 'returned' && lending.status !== 'returned') {
      lending.status = 'returned';
      lending.returnDate = new Date();
      
      // Increase availableCopies by 1
      const bookDoc = await Book.findById(lending.book);
      if (bookDoc) {
        bookDoc.availableCopies += 1;
        await bookDoc.save();
      }
    }
    const updatedLending = await lending.save();
    res.json(updatedLending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lending
exports.deleteLending = async (req, res) => {
  try {
    const lending = await Lending.findByIdAndDelete(req.params.id);
    if (!lending) return res.status(404).json({ message: 'Lending not found' });

    // If lending was borrowed and not returned, restore availableCopies
    if (lending.status === 'borrowed') {
      const bookDoc = await Book.findById(lending.book);
      if (bookDoc) {
        bookDoc.availableCopies += 1;
        await bookDoc.save();
      }
    }
    res.json({ message: 'Lending deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};