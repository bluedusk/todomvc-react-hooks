export class Todos {
  constructor() {
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

  updateTodoById(id, text) {
    let result;
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        // update text or completed
        if (text) {
          todo.text = text;
        } else {
          todo.completed = !todo.completed;
        }
        result = todo;
      }
    });

    return result;
  }
  deleteAll() {
    this.todos = [];
  }
  deleteCompleted() {
    this.todos = [...this.todos].filter(({ completed }) => !completed);
  }
  completeAll() {
    this.todos = [...this.todos].map((todo) => {
      return {
        ...todo,
        completed: true,
      };
    });
  }
}
