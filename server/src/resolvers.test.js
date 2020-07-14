import { resolvers } from "./resolvers";

describe("[Query]", () => {
  const mockContext = {
    Todos: { getTodos: jest.fn() },
  };
  // just for easy access
  const { getTodos } = mockContext.Todos;

  it("calls getTodos from todo api", async () => {
    // NOTE: these results get reversed in the resolver
    getTodos.mockReturnValueOnce([
      {
        id: "0",
        text: "Buy milk",
        completed: false,
      },
    ]);

    // check the resolver response
    const res = await resolvers.Query.todos(null, {}, mockContext);
    expect(res).toEqual([
      {
        id: "0",
        text: "Buy milk",
        completed: false,
      },
    ]);
  });
});
describe("[Mutation]", () => {
  const mockContext = {
    Todos: { addTodo: jest.fn(), getTodos: jest.fn() },
  };
  const { addTodo } = mockContext.Todos;

  it("calls addTodos from todo api", async () => {
    // NOTE: these results get reversed in the resolver
    addTodo.mockReturnValueOnce({
      id: "9",
      text: "new todo",
      completed: false,
    });

    // check the resolver response
    const res = await resolvers.Mutation.addTodo(null, {}, mockContext);
    expect(res).toEqual({
      id: "9",
      text: "new todo",
      completed: false,
    });
  });
});

describe("[Subscription]", () => {});
