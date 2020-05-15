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
    addTodo: (parent, { text }, { Todos }) => {
      const result = Todos.addTodo(text);
      pubsub.publish(TODO_ADDED, { todosUpdated: Todos.getTodos() });
      return result;
    },
    updateTodo: (parent, { id }, { Todos }) => {
      const result = Todos.updateTodoById(id);
      pubsub.publish(TODO_UPDATED, { todosUpdated: Todos.getTodos() });
      return result;
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
