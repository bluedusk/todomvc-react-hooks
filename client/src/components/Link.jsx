import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const Link = ({ children, setFilter, filter }) => (
	// eslint-disable-next-line
	<a
		href="#"
		type="button"
		// TODO:
		className={classnames({ selected: filter === "visibilityFilter" })}
		style={{ cursor: "pointer" }}
		onClick={() => setFilter(filter)}
	>
		{children}
	</a>
);
Link.propTypes = {
	children: PropTypes.node.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};
