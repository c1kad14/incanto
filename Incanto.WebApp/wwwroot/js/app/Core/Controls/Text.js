import React from "react";
import TextField from "material-ui/TextField";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple50, cyan500, pink700 } from 'material-ui/styles/colors';


class Text extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: "",
			value: this.props.fieldData.value
		};
	}

	checkErrors() {
		const currentValue = this.props.fieldData.value;

		if (this.props.fieldData.isRequired !== undefined && this.props.fieldData.isRequired) {
			if (currentValue === "") {
				const errorText = this.props.localizationInfo.requiredError;
				this.setState({ errorText: errorText });
				return errorText !== "";
			}
		}
		return false;
	}

	handleChanges(event) {
		const value = event.target.value;
		this.setState({ value: value });
		this.props.fieldData.value = value;
		this.checkErrors();
		this.props.model[this.props.fieldData.name] = value;
	}

	render() {
		let muiTheme = getMuiTheme({
			palette: {
				textColor: purple50
			}
		});
		let floatingLabelStyle = {
			floatingLabelStyle: {
				color: pink700
			},
			floatingLabelFocusStyle: {
				color: cyan500
			}
		}
		return <MuiThemeProvider muiTheme={muiTheme}>
			<TextField
				id="this.props.id"
				fullWidth={true}
				multiLine={true} 
				floatingLabelText={this.props.hintText}
				floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
				floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
				errorText={this.state.errorText}
				onChange={this.handleChanges.bind(this)}
				value={this.state.value} />
		</MuiThemeProvider>;
	}
}
module.exports = Text;