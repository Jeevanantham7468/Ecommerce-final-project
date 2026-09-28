require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const { users, products } = require('./data/seedData');
const { connectDB, closeDB } = require('./config/db');

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    for (const user of users) {
      const u = new User(user);
      await u.save();
      createdUsers.push(u);
    }

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('[Seeder] Data successfully imported!');
    if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
      await closeDB();
      process.exit();
    }
  } catch (error) {
    console.error(`[Seeder Error] ${error.message}`);
    if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
      process.exit(1);
    }
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('[Seeder] Data successfully destroyed!');
    if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
      await closeDB();
      process.exit();
    }
  } catch (error) {
    console.error(`[Seeder Error] ${error.message}`);
    if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
      process.exit(1);
    }
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
  importData();
}

module.exports = { importData, destroyData };
