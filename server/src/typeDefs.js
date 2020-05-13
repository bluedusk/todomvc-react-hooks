import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    todos: [TODO!]!
  }
  type TODO {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type Mutation {
    updateTodo(id: ID!): TODO!
  }
  type Subscription {
    todosUpdated: [TODO!]!
  }
`;
