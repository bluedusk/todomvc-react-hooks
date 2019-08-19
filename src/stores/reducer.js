export const reducer = (state, action) => {
  const { id, text } = action.payload;
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          {
            id: Math.random()
              .toString(16)
              .substring(2),
            completed: false,
            text
          }
        ]
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter(todo => todo.id !== id)
      };
    case "EDIT_TODO":
      return {
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, text: text } : todo
        )
      };
    case "COMPLETE_TODO":
      return {
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case "COMPLETE_ALL":
      const areAllMarked = this.state.todos.every(todo => todo.completed);
      return {
        todos: state.todos.map(todo => ({ ...todo, completed: !areAllMarked }))
      };
    case "CLEAR_ALL":
      return {
        todos: []
      };

    default:
      return state;
  }
};
