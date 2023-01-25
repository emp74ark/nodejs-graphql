import { model, Schema } from 'mongoose';

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
});

const Movie = model('Movie', movieSchema);

export { Movie };