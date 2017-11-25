import React from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";


class Text extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: "",
			value: this.props.fieldData.value
		};
	}

	checkErrors () {
		const currentValue = this.props.fieldData.value;

		if(this.props.fieldData.isRequired !== undefined && this.props.fieldData.isRequired) {
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
		return <MuiThemeProvider muiTheme={getMuiTheme()}>
			<TextField id="this.props.id" errorText={this.state.errorText} />
		</MuiThemeProvider>;
	}
}
module.exports = Text;