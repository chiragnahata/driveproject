const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db');

dotenv.config();
connectToDB();
const app = express();
const indexRouter = require('./routes/index.routes');

// ✅ Fix: Explicitly set the views folder path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
