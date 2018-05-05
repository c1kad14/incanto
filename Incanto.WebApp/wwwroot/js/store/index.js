/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import HomePage from "./HomePage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';


import configStore from "./cart/Store";

const { store, persistor } = configStore();

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
				<Route exact path="/cart" component={HomePage} />

			</Switch>
		</BrowserRouter>;
	}
}

ReactDOM.render(

	<PersistGate persistor={persistor}>
		<Provider store={store}>
						<Store name="HOME" />
		</Provider>
	</PersistGate>,
				document.getElementById("store")
)