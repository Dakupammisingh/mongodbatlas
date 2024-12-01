import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(); // Use the default database specified in the URI
    cachedClient = client;
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
