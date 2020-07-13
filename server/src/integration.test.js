import testServer from "./testUtils/testServer";
import { gql } from "apollo-server-express";
import { Todos } from "./data";

let todoApi;
beforeEach(() => {
  todoApi = new Todos();

  todoApi.getTodos = jest.fn(() => {
    return [
      {
        id: "0",
        text: "Buy milk",
        completed: false,
      },
      {
        id: "1",
        text: "Sing a song",
        completed: true,
      },
    ];
  });
});

describe("query todo", () => {
  it("fetches all todos", async () => {
    // We use a test server instead of the actual one.
    const { query } = testServer({ Todos: todoApi });

    const GET_TODOS = gql`
      query GetTodos {
        todos {
          id
          text
          completed
        }
      }
    `;

    const res = await query({ query: GET_TODOS });

    // We ensure that the errors are undefined.
    // This helps us to see what goes wrong.
    expect(res.errors).toBe(undefined);

    expect(todoApi.getTodos).toHaveBeenCalled();

    // We check to see if we have
    // all the todos in the sample.
    expect(res.data.todos).toEqual([
      {
        id: "0",
        text: "Buy milk",
        completed: false,
      },
      {
        id: "1",
        text: "Sing a song",
        completed: true,
      },
    ]);
  });
});

describe("mutation todo", () => {
  it("add todo", async () => {
    // We use a test server instead of the actual one.
    const { mutate } = testServer({ Todos: todoApi });

    const ADD_TODO = gql`
      mutation addTodoMutation($text: String!) {
        addTodo(text: $text) {
          id
          text
          completed
        }
      }
    `;

    const spy = jest.spyOn(todoApi, "addTodo");

    const res = await mutate({
      mutation: ADD_TODO,
      variables: { text: "new todo" },
    });

    expect(res.errors).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.data.addTodo).toEqual({
      completed: false,
      id: "3",
      text: "new todo",
    });
  });
  it("del todo", async () => {
    // TODO:
  });
  it("update todo", async () => {
    // TODO:
  });
  it("complete todo", async () => {
    // TODO:
  });
});
