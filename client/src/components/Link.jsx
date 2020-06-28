import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useVisibility } from "../hooks/useVisibility";

export const Link = ({ setFilter, filter }) => {
	const [visibilityFilter] = useVisibility();

	// eslint-disable-next-line
	return (
		<a
			href="#"
			type="button"
			className={classnames({ selected: filter === visibilityFilter })}
			style={{ cursor: "pointer" }}
			onClick={() => setFilter(filter)}
		>
			{filter}
		</a>
	);
};

Link.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};
