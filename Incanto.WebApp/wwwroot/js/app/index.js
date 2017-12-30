/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IncantoAppBar from "./Core/Controls/IncantoAppBar";

class Application extends React.Component {
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
		document.body.style.backgroundColor = DarkBaseTheme.palette.canvasColor;
		DarkBaseTheme.fontFamily = "Lucida Console";
		return <MuiThemeProvider muiTheme={GetMuiTheme(DarkBaseTheme)}>
			<div>
				<IncantoAppBar />
			</div>
		</MuiThemeProvider>;
	}
}

ReactDOM.render(
	<Application name="YO" />,
	document.getElementById("application")
)