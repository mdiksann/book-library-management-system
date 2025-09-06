const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

//Import routes (later)
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const lendingRoutes = require('./routes/lendingRoutes');

//Use routes
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/lendings', lendingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})