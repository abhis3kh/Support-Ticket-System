const express = require('express');
const colors = require('colors');
// database connection
const { connectDB } = require('./config/db');
// config the ENV variable
require('dotenv').config();
const PORT = process.env.PORT || 5000;

//initialize the app
const app = express();
// connecting to the database
connectDB();
// error handler
const { errorHandler } = require('./middleware/errorMiddleWare');
// Body Parser and Json middleware to handle the values
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing the routes
const userRoute = require('./routes/userRoute');

// Put the routes in action
app.use('/api/users', userRoute);

// passing error Handler
app.use(errorHandler);
// home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Support Ticket API' });
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
