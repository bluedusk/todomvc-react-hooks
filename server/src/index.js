import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import express from "express";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  // Don't mock fields that already have resolvers
  mockEntireSchema: false,
  formatError: err => {
    console.log(err);
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
