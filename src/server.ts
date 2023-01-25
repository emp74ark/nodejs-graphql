import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import {movieSchema} from './schema/schema';
import * as mongoose from 'mongoose'

dotenv.config();

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3000;
const db = 'mongodb://localhost:27017/graphql'

const server = express();

mongoose
    .set('strictQuery', true)
    .connect(db)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(err => console.log(err))

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