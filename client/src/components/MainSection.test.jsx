import React from "react";
import { renderApollo, act } from "../test-util";
import MainSection, { GET_ALL_TODOS } from "./MainSection";
import "@testing-library/jest-dom/extend-expect";
import { getByText, screen, waitFor } from "@testing-library/react";

test("should render", async () => {
	const mockTodos = [
		{ completed: false, id: "0", text: "Buy milk", __typename: "TODO" },
	];

	let mocks = [
		{
			request: { query: GET_ALL_TODOS },
			result: { data: { todos: mockTodos } },
		},
	];

	await act(async () => {
		const { debug } = renderApollo(<MainSection />, {
			addTypename: false,
			mocks,
		});
		debug();
	});
	// await waitFor(() => {
	// 	expect(screen.getByText(/Buy Milk/)).toBeInTheDocument();
	// });
	expect(screen.getByText(/Buy milk/)).toBeInTheDocument();
	expect(screen.getByText(/csdf /)).toBeInTheDocument();
});
