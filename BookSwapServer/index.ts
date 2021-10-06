import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const router = require('./router');
const dotenv = require('dotenv');

const filename = process.env.NODE_ENV === 'test'
  ? '.env.test'
  : '.env'

dotenv.config({ path: filename })

/* tslint:disable-next-line */
console.log(process.env.PORT) 


const app = express();
const options = {
  origin: '*',
  credentials: true,
};



app
  .use(cors(options))
  .use(express.json())
  .use(router)
  .use(morgan('tiny'))
  .listen(process.env.PORT);
