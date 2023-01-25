import { model, Schema } from 'mongoose';

const directorSchema = new Schema({
  name: String,
  age: Number,
});

const Director = model('Director', directorSchema);

export { Director };