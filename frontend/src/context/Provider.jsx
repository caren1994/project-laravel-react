import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Context from "./Context";

function Provider ({ children }) {
	const [ user, setUser ] = useState("");

	const context = useMemo(() => ({
		user,
		setUser
	}), [ user, setUser ]);

	return (
		<Context.Provider value={ context }>
			{ children }
		</Context.Provider>
	);
}

Provider.propTypes = {
	children: PropTypes.node.isRequired
};
export default Provider;
