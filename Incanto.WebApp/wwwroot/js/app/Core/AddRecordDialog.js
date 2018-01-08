import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Text from "./Controls/Text";
import DataService from "./Services/DataService";
import AutoComplete from "./Controls/AutoComplete";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { pink500 } from 'material-ui/styles/colors';


class AddRecordDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recordToUpdate: {}
		}
	}

	handleClose() {
		this.props.handleClose(false);
	}

	addRecordClickHandler() {
		if (this.state.recordToUpdate !== undefined) {
			DataService.addObject(this.props.controller, this.state.recordToUpdate, null);
			this.handleClose();
		}
	}

	render() {
		let modelFields = this.props.columns.filter(column => {
			return (column !== "id" && !column.includes("-"));
		});

		let childFields = this.props.columns.filter(column => {
			return (column.includes("-"));
		});

		let controls = modelFields.map((modelField, index) => {

			let fieldName = "name";
			let navigationPath = modelField.split(".");

			modelField = navigationPath[0];
			if (navigationPath.length === 2) {
				fieldName = navigationPath[1];
			}
			
			let fieldData = {
				modelField: modelField,
				name: fieldName,
				value: ""
			}
			let lookupField = undefined;

			if (this.props.lookup !== undefined) {
				lookupField = this.props.lookup.filter((field) => {
					return field[modelField] !== undefined;
				});
			}

			if (lookupField !== undefined && lookupField.length > 0) {
				this.state.recordToUpdate[modelField] = {};
				lookupField = lookupField[0];
				//here we need to split by "-"
				childFields.map(child => {
					let displayChild = child.split("-");
					if (displayChild[0] === modelField) {
						if (fieldData.displayChild === undefined) {
							fieldData.displayChild = [];
						}
						fieldData.displayChild.push(child);
					}
				});
				fieldData.isChildModel = true;
			} else {
				fieldData.name = modelField;
				lookupField = undefined;
				fieldData.isChildModel = false;
			}
			return (
				<div key={index}>
					{
						lookupField !== undefined ?
							<AutoComplete id={"add-new-" + modelField + "-autocomplete"} controller={lookupField[modelField].controller} fieldData={fieldData} model={this.state.recordToUpdate} /> :
							<Text id={"add-new-" + modelField + "-textfield"} hintText={modelField} model={this.state.recordToUpdate} fieldData={fieldData} />
					}
					<br />

				</div>
			);
		});

		let muiTheme = getMuiTheme({
			palette: {
				textColor: pink500,
				canvasColor: DarkBaseTheme.palette.canvasColor
			}
		});

		return <MuiThemeProvider muiTheme={muiTheme}>
			<Dialog id="add-new-record-dialog" title={"Add new " + this.props.controller + " record"} open={this.props.open} onRequestClose={this.handleClose.bind(this)}>
				{controls}
				<FlatButton id="add-new-record-button" label="Add" onClick={this.addRecordClickHandler.bind(this)} />
			</Dialog>
		</MuiThemeProvider>;
	}
}

module.exports = AddRecordDialog;