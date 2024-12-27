const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require("./types/user_type.js");
const { signup, login } = require("../services/auth.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, request) {
        return signup({
          email: args.email,
          password: args.password,
          req: request,
        });
      },
    },
    logout: {
      type: UserType,
      resolve(parent, args, request) {
        const { user } = request;
        request.logout();
        return user;
      },
    },
    login: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve(parent, args, request) {
          return login({
            email: args.email,
            password: args.password,
            req: request,
          });
        },
      },
  },
});

module.exports = mutation;
