/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class Store extends React.Component {
	render() {
		let test = {
			checkErrors: false,
			name: "name",
			dataSourceLink: "http://localhost:49801/api/countries/getlist",
			displayedValue: "name",
			modelValue: "name"
		}
		let model = {
			name: ""
		}
		return <BrowserRouter>
				<Switch>
				<Route exact path="/" render={() => (
					<Redirect to="/women" />
				)} />
					<Route exact path="/:gender" component={HomePage} />
					<Route exact path="/:gender/type/:typeId" component={HomePage} />
					<Route exact path="/:gender/type/:typeId/category/:categoryId" component={HomePage} />
					<Route exact path="/item/:itemId" component={HomePage} />
					<Route exact path="/brands" component={HomePage} />
				</Switch>
			</BrowserRouter>;
	}
}

ReactDOM.render(
	<Store name="HOME" />,
	document.getElementById("store")
)