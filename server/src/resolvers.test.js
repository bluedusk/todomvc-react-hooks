import { resolvers } from "./resolvers";

describe("[Query.todos]", () => {
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
