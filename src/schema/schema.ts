import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { Movie } from '../models/movie-model';
import { Director } from '../models/director-model';

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
        return Director.findById(parent.directorId);
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
        return Movie.findById(parent.id);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        const director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      }
    },
    removeDirector: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        return Director.findByIdAndUpdate(
            args.id, {
              $set: {
                name: args.name,
                age: args.age
              }
            },
            {new: true},
        );
      }
    },
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Movie.findById(args.id);
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Director.findById(args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Movie.find({});
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Director.find({});
      }
    },
  }
});

const movieSchema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export { movieSchema };