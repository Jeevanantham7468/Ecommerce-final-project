require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Product = require('./models/Product');
const User = require('./models/User');
const { importData } = require('./seeder');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    message: 'MERN Stack E-Commerce API is operational',
    version: '1.0.0',
    documentation: '/api/products, /api/users, /api/orders',
  });
});

app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database has no products
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    if (productCount === 0 || userCount === 0) {
      console.log('[Bootstrap] No products or users found. Automatically seeding demo dataset...');
      await importData();
    }

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 MERN E-Commerce Server running on port ${PORT}`);
      console.log(`📡 API Health: http://localhost:${PORT}/api`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
