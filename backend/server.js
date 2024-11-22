const express= require ('express');
const mongoose =require('mongoose');
const cors= require ('cors');
require('dotenv').config();
const app=express();
// middleware
app.use(cors());
app.use(express.json());
// importing routes
const categoryRoutes =require('./router/CategoryRoutes');
const productRoutes = require('./router/ProductRoutes');

// using routes
app.use('/api', categoryRoutes); // Route for categories
app.use('/api', productRoutes);  // Route for products

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/Projected')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

// starting the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
