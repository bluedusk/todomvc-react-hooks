import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();
const TODO_CHANGED = "TODO_CHANGED";

const doPublish = (todos) => {
  pubsub.publish(TODO_CHANGED, { todos });
};

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
      doPublish(Todos.getTodos());
      return result;
    },
    deleteTodo: (parent, { id }, { Todos }) => {
      const result = Todos.deleteTodo(id);
      doPublish(Todos.getTodos());
      return result;
    },
    updateTodo: (parent, { id, text }, { Todos }) => {
      const result = Todos.updateTodoById(id, text);
      doPublish(Todos.getTodos());
      return result;
    },
    deleteCompleted: (_, __, { Todos }) => {
      Todos.deleteCompleted();
      doPublish(Todos.getTodos());
      return true;
    },
    completeAll: (_, __, { Todos }) => {
      Todos.completeAll();
      doPublish(Todos.getTodos());
      return true;
    },
  },
  Subscription: {
    todos: {
      subscribe: () => {
        return pubsub.asyncIterator([TODO_CHANGED]);
      },
    },
  },
};
