import { MongoClient } from 'mongodb';
import { env } from '@/config/environment';

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  dbInstance = client.db(env.DB_NAME);
};

//get db instance
export const getDB = () => {
  if (!dbInstance) throw Error('Must connect db first!');
  return dbInstance;
};
