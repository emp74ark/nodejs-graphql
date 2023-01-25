import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const movies = [
  {id: 1, name: 'One', genre: 'Crime', directorId: 1},
  {id: 2, name: 'Two', genre: 'Comedy', directorId: 2},
  {id: 3, name: 'Three', genre: 'Drama', directorId: 3},
  {id: 3, name: 'Four', genre: 'Drama', directorId: 1},
  {id: 3, name: 'Five', genre: 'Drama', directorId: 1},
  {id: 3, name: 'Six', genre: 'Drama', directorId: 2},
];

const directors = [
  {id: 1, name: 'Name One', age: 30},
  {id: 2, name: 'Name Two', age: 40},
  {id: 3, name: 'Name Three', age: 50},
];

const MovieType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    year: {type: GraphQLInt},
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(el => el.id == parent.id);
      }
    }
  })
});

const DirectorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter(el => el.directorId === parent.id)
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return movies.find(el => el.id == args.id);
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return directors.find(el => el.id == args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return directors;
      }
    },
  }
});

const movieSchema = new GraphQLSchema({
  query: Query,
});

export { movieSchema };