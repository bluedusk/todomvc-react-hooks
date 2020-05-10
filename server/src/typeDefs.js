import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    author: Author!
    book: Book!
  }
  type Author {
    name: String!
    age: Int!
    books: [Book!]
  }
  type Book {
    name: String!
    price: Int!
    author: Author!
  }
`;
