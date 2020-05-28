import React, { useState } from "react";
import classnames from "classnames";
import { gql, useMutation } from "@apollo/client";
import { TodoTextInput } from "./TodoTextInput";

const DELETE_TODO = gql`
	mutation deleteTodoMutation($id: ID!) {
		deleteTodo(id: $id) {
			id
			text
			completed
		}
	}
`;
const UPDATE_TODO = gql`
	mutation updateTodoMutation($id: ID!, $text: String) {
		updateTodo(id: $id, text: $text) {
			id
			text
			completed
		}
	}
`;

export const TodoItem = ({ todo }) => {
	const [editing, setEditing] = useState(false);
	const [deleteTodoMutation] = useMutation(DELETE_TODO);
	const [updateTodoMutation] = useMutation(UPDATE_TODO);

	const editTodo = async (id, text) => {
		await updateTodoMutation({ variables: { id, text } });
	};

	const deleteTodo = async (id) => {
		await deleteTodoMutation({ variables: { id } });
	};

	const completeTodo = async (id) => {
		await updateTodoMutation({ variables: { id } });
	};

	const handleDoubleClick = () => setEditing(true);

	const handleSave = (id, text) => {
		if (text.length === 0) {
			deleteTodo(id);
		} else {
			editTodo(id, text);
		}
		setEditing(false);
	};

	return (
		<li
			className={classnames({
				completed: todo.completed,
				editing,
			})}
		>
			{editing ? (
				<TodoTextInput
					todoText={todo.text}
					editing={editing}
					onSave={(text) => handleSave(todo.id, text)}
				/>
			) : (
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={() => completeTodo(todo.id)}
					/>
					<label onDoubleClick={handleDoubleClick}>{todo.text}</label>
					<button
						type="button"
						className="destroy"
						onClick={() => deleteTodo(todo.id)}
					/>
				</div>
			)}
		</li>
	);
};
