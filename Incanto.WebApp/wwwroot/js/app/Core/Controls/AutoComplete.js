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
	}

	createFormatedItem(item, format) {
		let result = format;
		for (let key in item) {
	        if (item.hasOwnProperty(key)) {
	            result = result.replace(`[${key}]`, item[key]);
	        }
	    }
	    return result;
	}

	updateData(data) {
		if (data !== undefined && data != null && data.length > 0) {
			this.setState({ source: data });
			const controlData = [];
			for (let i = 0; i < this.state.source.length; i++) {
				controlData.push(this.state.source[i].model.name);
			    //controlData.push(this.createFormatedItem(this.state.source[i], this.props.fieldData.itemFormat));
			}
			this.setState({ autoCompleteData: controlData });
		} else {
			this.setState({ autoCompleteData: data });
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

	handleChanges(newValue) {
		let displayedValue = newValue;
		let modelValue = newValue;

		if (this.state.source.length > 0) {
			for (let i = 0; i < this.state.source.length; i++) {
				if (this.state.source[i].model.name.includes(newValue)) {
				    //if (this.createFormatedItem(this.state.source[i], this.props.fieldData.itemFormat) === newValue) {
				    //if (this.props.fieldData.displayedValue !== undefined) {
				    //    displayedValue = this.state.source[i].model[this.props.fieldData.displayedValue];
				    //} else {
				    //    displayedValue = newValue;
				    //}
					if (this.state.source[i].model.name === newValue) {
					    if (this.props.fieldData.isChildModel) {
							this.props.model[this.props.fieldData.modelField][this.props.fieldData.name] = modelValue;
							this.props.model[this.props.fieldData.modelField]["id"] = this.state.source[i].model.id;
					    } else {
					        this.props.model[this.props.fieldData.name] = modelValue;
					    }
					} else {
						if (this.props.fieldData.isChildModel) {
							this.props.model[this.props.fieldData.modelField][this.props.fieldData.name] = undefined;
							this.props.model[this.props.fieldData.modelField]["id"] = undefined;
						} else {
						    this.props.model[this.props.fieldData.name] = undefined;
						}
					}
				    //if (this.props.fieldData.modelValue !== undefined) {
				    //    modelValue = this.state.source[i].model[this.props.fieldData.modelValue];
				    //} else {
				    //    modelValue = newValue;
				    //}
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
		//var processData = this.updateData;
		//if (this.state.autoCompleteData.length === 0 && this.props.fieldData.dataSourceLink !== undefined) {
		//	RestApiCalls.get(this.props.fieldData.dataSourceLink).then(function (response) {
		//	    processData(response.data);
		//	});
		//}
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