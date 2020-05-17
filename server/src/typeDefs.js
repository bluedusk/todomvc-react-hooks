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
    addTodo(text: String!): TODO!
    updateTodo(id: ID!): TODO!
    deleteTodo(id: ID!): TODO
  }
  type Subscription {
    todos: [TODO!]!
  }
`;
