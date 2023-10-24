import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

let cachedClient = null;

if (!cachedClient) {
  cachedClient = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient.connect();
}

export async function connectToDatabase() {
  return cachedClient.db(MONGODB_DB);
}