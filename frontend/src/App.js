import React from "react";
import "./index.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

class App extends React.Component {
	render () {
		return (
			<Switch>
				<Route exact path="/" component={ Login } />
				<Route exact path="/register" component={ Register } />

			</Switch>
		);
	}
}

export default App;
