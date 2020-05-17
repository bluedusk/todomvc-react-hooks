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

  addTodo(todoText) {
    const todo = {
      id: String(this.getTodos().length + 1),
      text: todoText,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }
    return todo;
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
