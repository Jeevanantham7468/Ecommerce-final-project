const mongoose = require('mongoose');

let mongoServer = null;

const connectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      return;
    }
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri && mongoUri.trim() !== '') {
      const conn = await mongoose.connect(mongoUri);
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return;
    }

    console.log('[Database] No MONGODB_URI provided in .env. Initializing in-memory MongoDB engine for zero-setup demo...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[Database] In-memory MongoDB started and connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    // Attempt fallback to in-memory server if uri connection failed
    if (!mongoServer) {
      try {
        console.log('[Database] Attempting fallback to in-memory MongoDB...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        const conn = await mongoose.connect(uri);
        console.log(`[Database] Fallback In-memory MongoDB connected: ${conn.connection.host}`);
        return;
      } catch (innerErr) {
        console.error(`[Database Critical Error] Fallback failed: ${innerErr.message}`);
        process.exit(1);
      }
    }
    process.exit(1);
  }
};

const closeDB = async () => {
  if (mongoose.connection) {
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
};

module.exports = { connectDB, closeDB };
