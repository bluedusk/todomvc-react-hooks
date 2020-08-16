import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Header from "./Header";
import MainSection from "./MainSection";
import "@testing-library/jest-dom/extend-expect";

test("should render", () => {
	const { debug, getByText } = render(
		<MockedProvider addTypename={false}>
			<div>
				<Header />
				<MainSection />
			</div>
		</MockedProvider>
	);
	expect(getByText(/todos/)).toBeInTheDocument();
	debug();
});
