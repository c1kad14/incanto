import React from "react";
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
		RestApiCalls.get("http://localhost:49801/api/countries/getlist").then(function (response) {
			response.data.forEach(function (element) {
			});
		});
	}

	render() {
	    return <FlatButton id="load" label={this.props.label} onClick={this.showAlert} />;
	}
}
module.exports = Button;