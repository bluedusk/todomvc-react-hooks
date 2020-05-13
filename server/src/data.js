export class Todos {
  constructor() {
    console.log("-------> new Todos");
    this.todos = [
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
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  updateTodoById(id) {
    let result;
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        result = todo;
      }
    });

    return result;
  }
}
