import express from 'express';

import { connectDB } from '@/config/mongodb';
import { env } from '@/config/environment';

connectDB()
  .then(() => console.log('connected success to db'))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.get('/test', (req, res) => {
    res.end('<h1>hollo</h1>');
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log('running');
  });
};
