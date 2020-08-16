import React from "react";
import { render } from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import { MockedProvider } from "@apollo/client/testing";

// type RenderApolloOptions = {
// 	mocks?: MockedResponse[];
// 	addTypename?: any;
// 	defaultOptions?: any;
// 	cache?: any;
// 	resolvers?: any;
// 	[st: string]: any;
// };

const renderApollo = (
	node,
	{ mocks, addTypename = false, defaultOptions, cache, resolvers, ...options }
) => {
	return render(
		<MockedProvider
			mocks={mocks}
			addTypename={addTypename}
			defaultOptions={defaultOptions}
			cache={cache}
			resolvers={resolvers}
		>
			{node}
		</MockedProvider>,
		options
	);
};

export { renderApollo };
