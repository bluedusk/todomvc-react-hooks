/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useCallback } from "react";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList";

const GET_ALL_TODOS = gql`
	query getAllTodos {
		todos {
			id
			text
			completed
		}
	}
`;
const COMPLETE_ALL = gql`
	mutation completeAll {
		completeAll
	}
`;
const DELETE_COMPLETED = gql`
	mutation deleteCompleted {
		deleteCompleted
	}
`;

const GET_VISIBILITY_FILTER = gql`
	query GetVisibilityFilter {
		visibilityFilter @client
	}
`;

const getCompletedCount = (todos) =>
	todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

const MainSection = () => {
	const [completeAll] = useMutation(COMPLETE_ALL);
	const [deleteAll] = useMutation(DELETE_COMPLETED);
	const { data: visibilityData, client } = useQuery(GET_VISIBILITY_FILTER);

	const { loading, error, data, startPolling, stopPolling } = useQuery(
		GET_ALL_TODOS
	);

	const setVisibility = useCallback(
		(filter) =>
			client.writeQuery({
				query: gql`
					query GetVisibilityFilter {
						visibilityFilter
					}
				`,
				data: { visibilityFilter: filter },
			}),
		[client]
	);

	useEffect(() => {
		setVisibility("All");
	}, [setVisibility]);

	useEffect(() => {
		window.addEventListener("load", () => {
			console.log("Start Polling...");
			startPolling(2000);
		});
		window.addEventListener("focus", () => {
			console.log("Start Polling...");
			startPolling(2000);
		});
		window.addEventListener("blur", () => {
			console.log("Stop Polling...");
			stopPolling();
		});

		return () => {
			window.removeEventListener("load");
			window.removeEventListener("focus");
			window.removeEventListener("blur");
		};
	}, [startPolling, stopPolling]);

	if (loading) {
		return null;
	}

	if (error) {
		console.log(error);
	}

	console.log(data.todos);

	const { todos } = data;
	const todosCount = todos.length;
	const completedCount = getCompletedCount(todos);
	return (
		<section className="main">
			{!!todosCount && (
				<span>
					<input
						className="toggle-all"
						type="checkbox"
						defaultChecked={completedCount === todosCount}
					/>
					<label onClick={() => completeAll()} />
				</span>
			)}
			<TodoList
				todos={todos}
				visibilityFilter={visibilityData.visibilityFilter}
			/>
			{!!todosCount && (
				<Footer
					setFilter={setVisibility}
					completedCount={completedCount}
					activeCount={todosCount - completedCount}
					onClearCompleted={() => deleteAll()}
				/>
			)}
		</section>
	);
};

export default MainSection;
