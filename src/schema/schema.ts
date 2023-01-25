import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } from 'graphql';

const movies = [
  {id: 1, name: 'One', genre: 'Crime', directorId: 1},
  {id: 2, name: 'Two', genre: 'Comedy', directorId: 2},
  {id: 3, name: 'Three', genre: 'Drama', directorId: 3},
]

const directors = [
  {id: 1, name: 'Name One', age: 30},
  {id: 2, name: 'Name Two', age: 40},
  {id: 3, name: 'Name Three', age: 50},
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    year: {type: GraphQLInt},
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(el => el.id == parent.id)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return movies.find(el => el.id == args.id)
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return directors.find(el => el.id == args.id)
      }
    }
  }
})

const movieSchema = new GraphQLSchema({
  query: Query,
})

export {movieSchema}