const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT ;
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DATABASE
} = process.env;
// Connect to MongoDB using Mongoose
  
  mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })  
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(express.json()); 
app.use(cors())

// Routes
const backendRoutes = require('./backendRoutes'); 
const customerRoutes  = require('./customerRoutes')
backendRoutes(app)
customerRoutes(app)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
