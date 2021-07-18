import express from 'express';

import { connectDB } from '@/config/mongodb';
import { env } from '@/config/environment';

const app = express();

connectDB().catch(console.log);

app.get('/', (req, res) => {
  res.end('<h1>hollo</h1>');
});

app.listen(env.PORT, env.HOST_NAME, () => {
  console.log('running');
});
