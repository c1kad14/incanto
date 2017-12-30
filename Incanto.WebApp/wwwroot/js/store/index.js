/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

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
		return <HomePage />;
	}
}

ReactDOM.render(
	<Store name="HOME" />,
	document.getElementById("store")
)