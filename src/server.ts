import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import {movieSchema} from './schema/schema';

dotenv.config();

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3000;

const server = express();

server.use('/graphql', graphqlHTTP({
  schema: movieSchema,
  graphiql: true,
}))

server.use(cors());

server
    .listen(port, host, () => {
      console.log(`Server starts on: ${ host }:${ port }`);
    })
    .on('error', (err) => {
      console.log(err);
    });