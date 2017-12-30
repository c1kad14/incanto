import React from "react";
import Snackbar from "material-ui/Snackbar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class NotificationSnackbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true
		}
	}

	handleTouchTap() {
		this.setState({
			open: true
		});
	}

	handleActionTouchTap() {
		if (this.props.actionFunc !== undefined) {
			this.props.actionFunc();
		}
		this.setState({ open: false });
	}

	handleRequestClose() {
		this.setState({ open: false });
		this.state.open = true;
	}

	render() {
		return (<MuiThemeProvider><Snackbar
			open={this.state.open}
			message={this.props.message}
			action={this.props.actionText}
			autoHideDuration={this.props.autoHideDuration}
			onActionTouchTap={this.handleActionTouchTap}
			onRequestClose={this.handleRequestClose} /></MuiThemeProvider>);
	}
}

module.exports = NotificationSnackbar;