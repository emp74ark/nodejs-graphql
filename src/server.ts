import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3000;

const server = express();

server
    .listen(port, host, () => {
      console.log(`Server starts on: ${ host }:${ port }`);
    })
    .on('error', (err) => {
      console.log(err);
    });

server.use(cors());
