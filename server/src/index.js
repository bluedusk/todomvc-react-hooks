import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import express from "express";
import { Todos } from "./data";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";

const app = express();
const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: false,
  // Don't mock fields that already have resolvers
  mockEntireSchema: false,
  // context is an object not a function so it will not be triggered for each request which is what we want
  context: {
    Todos: new Todos(),
  },
  formatError: (err) => {
    console.log(err);
  },
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
