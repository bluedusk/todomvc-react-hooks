import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();
const TODO_ADDED = "TODO_ADDED";
const TODO_UPDATED = "TODO_UPDATED";

export const resolvers = {
  Query: {
    hello: () => "hello dan",
    todos: (parent, args, { Todos }) => {
      return Todos.getTodos();
    },
  },
  Mutation: {
    updateTodo: (parent, { id }, { Todos }) => {
      pubsub.publish(TODO_UPDATED, { todosUpdated: Todos.getTodos() });
      return Todos.updateTodoById(id);
    },
  },
  Subscription: {
    todosUpdated: {
      subscribe: () => {
        return pubsub.asyncIterator([TODO_ADDED, TODO_UPDATED]);
      },
    },
  },
};
