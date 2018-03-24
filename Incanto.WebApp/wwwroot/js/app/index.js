/*React Core*/
"use strict";
import React from "react";
import ReactDOM from "react-dom";
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import GetMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IncantoAppBar from "./Core/Controls/IncantoAppBar";

class Application extends React.Component {
	render() {
		document.body.style.backgroundColor = lightBaseTheme.palette.canvasColor;
		lightBaseTheme.fontFamily = "Lucida Console";
		return <MuiThemeProvider muiTheme={GetMuiTheme(lightBaseTheme)}>
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