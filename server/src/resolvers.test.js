import testServer from "./testUtils/testServer";
import { gql } from "apollo-server-express";
import { Todos } from "./data";

describe("todo", () => {
  it("fetches all todos", async () => {
    const todoApi = new Todos();

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
