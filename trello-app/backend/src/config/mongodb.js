import { MongoClient } from 'mongodb';
import { env } from '@/config/environment';

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    console.log('connect');
    await listDB(client);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

export const listDB = async (client) => {
  const databaseList = await client.db().admin().listDatabases();
  //   console.log(databaseList);
  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
};
