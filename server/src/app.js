require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const sessionRoutes = require('./routes/session');
const chatRoutes = require('./routes/chat');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ status: 'Server running ✓' }));

// Routes
app.use('/api/session', sessionRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
