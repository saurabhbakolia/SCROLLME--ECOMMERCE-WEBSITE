const express = require('express');
const app = express();
const dbConnect = require('./api/database/dbConnect');
const authRoutes = require('./api/routes/authRoute');
const cartRoute = require('./api/routes/cartRoute');
const productRoute = require('./api/routes/productRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const authMiddleware = require('./api/middleware/authMiddleware');
require('dotenv').config();

// Connect to the database
dbConnect();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
// Middlewares
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON requests
app.use(
  express.urlencoded({
    extended: true,
  })
); // `extended` option allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cookieParser());
app.use(helmet());

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/cart', authMiddleware, cartRoute); // Cart routes
app.use('/api/product', productRoute); // Product routes

// // Rate limiting middleware
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'test')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/auth`);
  });

module.exports = app;
