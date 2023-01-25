import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } from 'graphql';

const movies = [
  {id: 1, name: 'One', genre: 'Crime'},
  {id: 2, name: 'Two', genre: 'Comedy'},
  {id: 3, name: 'Three', genre: 'Drama'},
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    year: {type: GraphQLInt},
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
    }
  }
})

const movieSchema = new GraphQLSchema({
  query: Query,
})

export {movieSchema}