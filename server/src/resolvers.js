import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();
const TODO_ADDED = "TODO_ADDED";
const TODO_UPDATED = "TODO_UPDATED";
const TODO_DELETED = "TODO_DELETED";

export const resolvers = {
  Query: {
    hello: () => "hello dan",
    todos: (parent, args, { Todos }) => {
      return Todos.getTodos();
    },
  },
  Mutation: {
    addTodo: (parent, { text }, { Todos }) => {
      const result = Todos.addTodo(text);
      pubsub.publish(TODO_ADDED, { todos: Todos.getTodos() });
      return result;
    },
    deleteTodo: (parent, { id }, { Todos }) => {
      const result = Todos.deleteTodo(id);
      pubsub.publish(TODO_DELETED, { todos: Todos.getTodos() });
      return result;
    },
    updateTodo: (parent, { id, text }, { Todos }) => {
      const result = Todos.updateTodoById(id, text);
      pubsub.publish(TODO_UPDATED, { todos: Todos.getTodos() });
      return result;
    },
  },
  Subscription: {
    todos: {
      subscribe: () => {
        return pubsub.asyncIterator([TODO_ADDED, TODO_UPDATED, TODO_DELETED]);
      },
    },
  },
};
