import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const Link = ({ children, filter }) => {
	// const [{ visibilityFilter }, dispatch] = useTodo();
	console.log(1);
	return (
		<a
			href="#"
			type="button"
			// TODO:
			className={classnames({ selected: filter === "visibilityFilter" })}
			style={{ cursor: "pointer" }}
			onClick={
				() => {
					// TODO:
				}
				// dispatch({
				// 	type: "SET_VISIBILITY",
				// 	payload: {
				// 		visibilityFilter: filter,
				// 	},
				// })
			}
		>
			{children}
		</a>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	filter: PropTypes.string.isRequired,
};
