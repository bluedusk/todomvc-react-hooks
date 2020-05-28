import React from "react";
import { gql, useMutation } from "@apollo/client";
import { TodoTextInput } from "./TodoTextInput";

const ADD_TODO = gql`
	mutation addTodoMutation($text: String!) {
		addTodo(text: $text) {
			id
			text
			completed
		}
	}
`;
const Header = () => {
	// const dispatch = useTodo()[1];

	const [addTodoMutation] = useMutation(ADD_TODO);
	return (
		<header className="header">
			<h1>todos</h1>
			<TodoTextInput
				newTodo
				onSave={(text) => {
					if (text.length !== 0) {
						addTodoMutation({ variables: { text } });
					}
				}}
				placeholder="What needs to be done?"
			/>
		</header>
	);
};

export default Header;
