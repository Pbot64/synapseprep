import mongoose from 'mongoose';

let cachedDb = null;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (cachedDb !== null) {
    return;
  }

  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  // If no connection is cached, create a new one
  cachedDb = await mongoose.connect(uri, { useNewUrlParser: true });

  // Cache the database connection and return the connection
}

export default connectToDatabase;
