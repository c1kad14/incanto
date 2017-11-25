import React from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RestApiCalls from "../Services/RestApiCalls";


class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: "",
			label: ""
		};
	}

	showAlert() {
		RestApiCalls.get("http://localhost:57057/api/countries/getlist").then(function (response) {
			response.data.forEach(function (element) {
				console.log(element.model.name);
			});
		});
	}

	render() {
		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<FlatButton id="load" label={this.props.label} onClick={this.showAlert} />
		</MuiThemeProvider>;
	}
}
module.exports = Button;