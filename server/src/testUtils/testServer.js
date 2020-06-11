import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../resolvers";
import { typeDefs } from "../typeDefs";

export default function testServer(context) {
  return createTestClient(new ApolloServer({ typeDefs, resolvers, context }));
}
