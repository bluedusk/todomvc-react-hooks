import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../resolvers";
import { typeDefs } from "../typeDefs";

/**
 * Similarly we can pass datasource to test client.
 * @param {*} context
 */
export default function testServer(context) {
  return createTestClient(new ApolloServer({ typeDefs, resolvers, context }));
}
