/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class Store extends React.Component {
	render() {
		return <BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/:gender" component={HomePage} />
					<Route exact path="/:gender/type/:typeId" component={HomePage} />
					<Route exact path="/:gender/type/:typeId/category/:categoryId" component={HomePage} />
					<Route exact path="/item/:itemId" component={HomePage} />
					<Route exact path="/sale" component={HomePage} />
					<Route exact path="/help" component={HomePage} />
					<Route exact path="/contacs" component={HomePage} />

				</Switch>
			</BrowserRouter>;
	}
}

ReactDOM.render(
	<Store name="HOME" />,
	document.getElementById("store")
)