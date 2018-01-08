import React, { Component, PropTypes } from "react";
import AutoComplete from "material-ui/AutoComplete";
import DataService from "../Services/DataService";
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple50, cyan500, pink700 } from 'material-ui/styles/colors';

class AutoCompleteControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    displayName: "AutoCompleteControl",
			errorText: "",
			autoCompleteData: [],
			source: []
		};

		this.updateData = this.updateData.bind(this);
		this.handleChanges = this.handleChanges.bind(this);
		this.createFormatedItem = this.createFormatedItem.bind(this);
		this.checkChildFields = this.checkChildFields.bind(this);
	}

	createFormatedItem(iterator) {
		let displayChild = this.props.fieldData.displayChild;
		let result = "";
		for (let i = 0; i < displayChild.length; i++) {
			let itemToFormat = this.state.source[iterator].model;
			let splittedChild = displayChild[i].split("-");
			//we are working here with alerady with childModel, so we need to skip first splitted child
			//because we don't have it here
			for (let j = 1; j < splittedChild.length; j++) {
				if (!splittedChild[j].includes(".")) {
					itemToFormat = itemToFormat[splittedChild[j]];
				} else {
					let splittedFieldAndName = splittedChild[j].split(".");
					result = result + "-" + itemToFormat[splittedFieldAndName[0]][splittedFieldAndName[1]];
				}
			}

		}
	    return result;
	}

	updateData(data) {
		if (data !== undefined && data != null && data.length > 0) {
			this.state.source = data;
			const controlData = [];
			for (let i = 0; i < this.state.source.length; i++) {
				let displayChild = this.props.fieldData.displayChild;
				let unformatedName = this.state.source[i].model[this.props.fieldData.name];
				
				if (displayChild !== undefined) {
					let formatedName = unformatedName + this.createFormatedItem(i);
					controlData.push(formatedName);
				} else {
					controlData.push(unformatedName);
				}
			}
			this.setState({ autoCompleteData: controlData });
		} 
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

	checkChildFields(iterator, childValues) {
		let displayChild = this.props.fieldData.displayChild;
		let result = false;

		if (childValues === undefined) {
			return false;
		}

		for (let i = 0; i < displayChild.length; i++) {
			let fieldsToCheck = this.state.source[iterator].model;
			let child = displayChild[i];
			let splittedChild = child.split("-");
			for (let j = 1; j < splittedChild.length; j++)
			{
				if (!splittedChild[j].includes(".")) {
					fieldsToCheck = fieldsToCheck[splittedChild[j]];
				} else {
					let splittedFieldAndName = splittedChild[j].split(".");
					fieldsToCheck = fieldsToCheck[splittedFieldAndName[0]];
					result = fieldsToCheck[splittedFieldAndName[1]] === childValues[i];
				}
			}
			if (!result) {
				return false;
			} else {
				if (displayChild.length !== i + 1) {
					result = false;
				}
			}
		}
		return result;
	}

	handleChanges(newValue) {
		let displayedValue = newValue;
		let values, modelValue, childValues;
		let displayChild = this.props.fieldData.displayChild;
		if (displayChild !== undefined) {
			values = newValue.split("-");
			modelValue = values[0];
			childValues = values.filter(value => value !== modelValue);
		} else {
			modelValue = newValue;
		}

		if (this.state.source.length > 0) {
			for (let i = 0; i < this.state.source.length; i++) {
				if (this.state.source[i].model.name.includes(modelValue)) {
					if (displayChild &&
						this.state.source[i].model.name === modelValue &&
						this.checkChildFields(i, childValues)
						|| !displayChild && this.state.source[i].model.name === modelValue) {

						if (this.props.fieldData.isChildModel) {
							this.props.model[this.props.fieldData.modelField][this.props.fieldData.name] = modelValue;
							this.props.model[this.props.fieldData.modelField].id = this.state.source[i].model.id;
						} else {
							this.props.model[this.props.fieldData.name] = modelValue;
						}
					}
				}
			}
		}

		this.props.fieldData.value = displayedValue;
		this.checkErrors();

		this.setState({ errorText: "" });

	}

	componentWillMount() {
		this.props.fieldData.checkErrors = this.checkErrors;
		const modelValue = this.props.fieldData.isChildModel ? this.props.model[this.props.fieldData.modelField][this.props.fieldData.name] : this.props.model[this.props.fieldData.name];
		if (modelValue !== "" && modelValue != undefined) {
			this.props.fieldData.value = modelValue;
		}
	    var processData = this.updateData;
	    if (this.state.autoCompleteData.length === 0) {
			DataService.getItems(this.props.controller, processData);
	    }
	}

	render() {
	    let muiTheme = getMuiTheme({
	        palette: {
				textColor: purple50,
				canvasColor: DarkBaseTheme.palette.canvasColor
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
		const filter = this.props.fieldData.noFilter ? AutoComplete.noFilter : AutoComplete.fuzzyFilter;
		return (
		    <MuiThemeProvider muiTheme={muiTheme}>
				<AutoComplete
					id={this.props.id}
					searchText={this.props.fieldData.value}
					onUpdateInput={this.handleChanges}
					floatingLabelText={this.props.fieldData.modelField}
					floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
					floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle} 
					filter={filter}
					dataSource={this.state.autoCompleteData}
					maxSearchResults={this.props.fieldData.maxSearchResults}
					errorText={this.state.errorText}
					fullWidth={true} />
		    </MuiThemeProvider>
		);
	}
}

export default AutoCompleteControl;