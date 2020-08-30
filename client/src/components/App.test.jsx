import React from "react";
import { renderApollo } from "../test-util";
import Header from "./Header";
import MainSection from "./MainSection";

jest.mock("./MainSection", () => {
	return {
		__esModule: true,
		default: () => {
			return <div>Mocked MainSection</div>;
		},
	};
});

test("should render", async () => {
	const { debug, getByText } = renderApollo(
		<>
			<Header />
			<MainSection />
		</>,
		{}
	);
	expect(getByText(/todos/)).toBeInTheDocument();
	debug();
});
