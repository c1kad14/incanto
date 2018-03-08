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
				recordToUpdate: this.props.recordToUpdate !== undefined ? this.props.recordToUpdate : {}
		}
		this.validateModel = this.validateModel.bind(this);
	}

	handleClose() {
		this.props.close(false);
	}

	addRecordClickHandler() {
		if (this.state.recordToUpdate !== undefined && this.validateModel()) {
			DataService.addObject(this.props.controller, this.state.recordToUpdate, this.props.refreshDataTable);
			this.handleClose();
		}
	}

	editRecordClickHandler() {
		if (this.state.recordToUpdate !== undefined && this.validateModel()) {
			DataService.updateObject(this.props.controller, this.state.recordToUpdate, this.props.refreshDataTable);
			this.handleClose();
		}
	}

	validateModel() {
		let modelFields = this.props.columns.filter(column => {
			return (column !== "id" && !column.includes("-"));
		});
		let result = true;
		for (let i =0; i < modelFields.length; i++) {
			let navigationPath = modelFields[i].split(".");

			let modelField = navigationPath[0];
			let modelFieldName = "";
			if (navigationPath.length === 2) {
				modelFieldName = navigationPath[1];
				if (this.state.recordToUpdate[modelField] === undefined || this.state.recordToUpdate[modelField] === null || this.state.recordToUpdate[modelField][modelFieldName] === undefined || this.state.recordToUpdate[modelField][modelFieldName] === null || this.state.recordToUpdate[modelField][modelFieldName] === "") {
					result = false;
				}
			} else {
				if (this.state.recordToUpdate[modelField] === undefined || this.state.recordToUpdate[modelField] === null || this.state.recordToUpdate[modelField] === "") {
					result = false;
				}
			}

		}

		return result;
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
				let value = "";
				if (this.state.recordToUpdate[modelField] !== undefined) {
					value = this.state.recordToUpdate[modelField][fieldName];
				} 

				lookupField = lookupField[0];
				//here we need to split by "-"
				childFields.map(child => {
					let displayChild = child.split("-");
					if (displayChild[0] === modelField) {
						if (fieldData.displayChild === undefined) {
							fieldData.displayChild = [];
						}
						let result = "";
						if (this.state.recordToUpdate[modelField] !== undefined) {
								let itemToFormat = this.state.recordToUpdate[modelField];
								for (let j = 1; j < displayChild.length; j++) {
									if (!displayChild[j].includes(".")) {
										itemToFormat = itemToFormat[displayChild[j]];
									} else {
										let splittedFieldAndName = displayChild[j].split(".");
										result = itemToFormat[splittedFieldAndName[0]][splittedFieldAndName[1]];
									}
								}
						}
						value = value !== "" ? value + "-" + result : result;
						fieldData.displayChild.push(child);
					}
				});
				fieldData.isChildModel = true;
				fieldData.value = value;
			} else {
				fieldData.name = modelField;
				lookupField = undefined;
				fieldData.isChildModel = false;
				fieldData.value = this.state.recordToUpdate[modelField];
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

		const saveButton = this.state.recordToUpdate.id !== undefined ? <FlatButton id="edit-existing-record-button" label="Сохранить" onClick={this.editRecordClickHandler.bind(this)} primary={true} /> : <FlatButton id="add-new-record-button" label="Добавить" onClick={this.addRecordClickHandler.bind(this)} primary={true} /> ;

		let dialogActions = [
			<FlatButton id="close-dialog" label="Отмена" onClick={this.handleClose.bind(this)} secondary={true} />,
			saveButton
		];

		return <MuiThemeProvider muiTheme={muiTheme}>
			<Dialog actions={dialogActions} fullWidth={false} id="add-new-record-dialog" title={"Add new " + this.props.controller + " record"} open={this.props.open} onRequestClose={this.handleClose.bind(this)}>
				{controls}

			</Dialog>
		</MuiThemeProvider>;
	}
}

module.exports = AddRecordDialog;