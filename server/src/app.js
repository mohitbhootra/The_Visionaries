require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const sessionRoutes = require('./routes/session');
const chatRoutes = require('./routes/chat');
const volunteerRoutes = require('./routes/volunteer');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
	process.env.CLIENT_ORIGIN,
	'http://localhost:5173',
	'http://localhost:8080'
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('Not allowed by CORS'));
		}
	})
);
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ status: 'Server running ✓' }));

// Routes
app.use('/api/session', sessionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/volunteer', volunteerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));