import React from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import { reducer } from "../stores/reducer";
import { TodoProvider } from "../TodoProvider";

const App = () => {
	const initialState = {
		todos: [
			{
				text: "React Hooks",
				completed: false,
				id: 0
			},
			{
				text: "Context",
				completed: true,
				id: 1
			}
		],
		visibilityFilter: "All"
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
