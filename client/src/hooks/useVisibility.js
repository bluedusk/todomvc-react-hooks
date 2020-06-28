import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";

const GET_VISIBILITY_FILTER = gql`
	query GetVisibilityFilter {
		visibilityFilter @client
	}
`;

export const useVisibility = () => {
	const { data: visibilityData, client } = useQuery(GET_VISIBILITY_FILTER);

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

	return [
		visibilityData ? visibilityData.visibilityFilter : null,
		setVisibility,
	];
};
