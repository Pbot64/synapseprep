import mongoose from 'mongoose';

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const db = await mongoose.connect(uri, { useNewUrlParser: true });

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

export default async () => {
  await connectToDatabase(process.env.MONGODB_URI);
};
