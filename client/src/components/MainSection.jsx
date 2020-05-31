/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
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
const DELETE_ALL = gql`
	mutation deleteAll {
		deleteAll
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
	const [deleteAll] = useMutation(DELETE_ALL);
	const { data: visibilityData, client } = useQuery(GET_VISIBILITY_FILTER);

	console.log("--------------------------", visibilityData);

	const { loading, error, data, startPolling, stopPolling } = useQuery(
		GET_ALL_TODOS
	);

	const setVisibility = (filter) =>
		client.writeQuery({
			query: gql`
				query GetVisibilityFilter {
					visibilityFilter
				}
			`,
			data: { visibilityFilter: filter },
		});

	useEffect(() => {
		setVisibility("All");
	}, []);

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
	}, []);

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
					<label
						onClick={() => {
							completeAll();
						}}
					/>
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
