import React from "react";
import Header from "./Header";
import MainSection from "./MainSection";

const App = () => {
  const initialState = {
    todos: [
      {
        text: "First task",
        completed: false,
        id: 0
      },
      {
        text: "Second task",
        completed: true,
        id: 1
      }
    ]
  };

  return (
    <TodoProvider initialState={initialState} reducer={reducer}>
      <div>
        <Header />
        <MainSection />
      </div>
    </TodoProvider>
  );
};

export default App;
