import React from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import Header from "./Header";
import MainSection from "./MainSection";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "http://localhost:4000/graphql",
	}),
	connectToDevTools: true,
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div>
				<Header />
				<MainSection />
			</div>
		</ApolloProvider>
	);
};

export default App;
