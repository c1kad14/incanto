import React from "react";
import Dialog from 'material-ui/Dialog';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	} from "material-ui/Table";
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RestApiCall from "./Services/RestApiCalls";
import DataService from "./Services/DataService";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { pink500 } from 'material-ui/styles/colors';

const detailsController = "Details";
const detailTypesController = "DetailTypes";
const detailTypeValuesController = "DetailTypeValues";

const styles = {
	customWidth: {
		width: "225px"
	},
	displayNone: {
		display: "none"
	},
	tableActionColumn: {
		width: '20%'
	},
	tableHeaderPadding: {
		padding: "5px"
	}
};

class AddDetailDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryId: this.props.item.category.id,
			itemId: this.props.item.id,
			selectedDetailTypeId: undefined,
			selectedDetailTypeValueId: undefined,
			detailTypes: [],
			detailTypeValues: [],
			existingDetails: [],
			detailsToDelete: []
		}
	}

	handleClose() {
		this.props.close(false);
	}

	saveDetailsClickHandler() {
		let details = this.state.existingDetails.filter((detail) => {
			return detail.id === undefined;
		});
		if (details.length > 0) {
			RestApiCall.post(`/api/${detailsController}/AddList`, details);
		}

		if (this.state.detailsToDelete.length > 0) {
			this.state.detailsToDelete.map((detail) => {
				DataService.deleteObject(detailsController, detail);
			});
		}
		this.handleClose();
	}

	setExistingDetails(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ existingDetails: newData },
				() => {
					console.log('updated existingDetails value', this.state.existingDetails);
				});
		}
	}

	setDetailTypes(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ detailTypes: newData },
				() => {
					console.log('updated detailTypes value', this.state.detailTypes);
				});
		}
	}

	setDetailTypeValues(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ detailTypeValues: newData },
				() => {
					console.log('updated detailTypeValues value', this.state.detailTypeValues);
				});
		}
	}

	detailTypeChangeHandler(event, index, value) {
		this.setState({ selectedDetailTypeId: value });
		
	}

	detailTypeValueChangeHandler(event, index, value) {
		this.setState({ selectedDetailTypeValueId: value });
	}

	addDetailClickHandler() {
		let existingDetails = this.state.existingDetails;
		const detailTypeValue = this.state.detailTypeValues.filter((dtv) => {
			return dtv.id === this.state.selectedDetailTypeValueId;
		});

		let contains = existingDetails.filter((detail) => {
			return detail.detailValue.id === this.state.selectedDetailTypeValueId;
		});
		if (this.state.selectedDetailTypeValueId !== undefined && contains.length === 0) {
			let newDetail = {
				itemId: this.state.itemId,
				detailValue: detailTypeValue[0]
			};
			existingDetails.push(newDetail);
			this.setState({
					existingDetails: existingDetails, selectedDetailTypeId: undefined, selectedDetailTypeValueId: undefined
				},
				() => {
					console.log('updated existing details', this.state.existingDetails);
				});
		}
		
	}

	getTableHeader() {
		const detailTypesForSelectedCategory = this.state.categoryId !== undefined ? this.state.detailTypes.filter((detailType) => {
			return detailType.category.id === this.state.categoryId;
		}) : undefined;

		const detailTypes = detailTypesForSelectedCategory!== undefined ? detailTypesForSelectedCategory.map((detailType) => {
			return <MenuItem key={detailType.id} value={detailType.id} primaryText={detailType.name}/>;
		}) : undefined;
		const detailTypeValuesForSelectedType = this.state.selectedDetailTypeId !== undefined ? this.state.detailTypeValues.filter((detailTypeValue) => {
			return detailTypeValue.detailType.id === this.state.selectedDetailTypeId;
		}) : undefined;

		const detailTypeValues = detailTypeValuesForSelectedType !== undefined
			? detailTypeValuesForSelectedType.map((detailtTypeValue) => {
				return <MenuItem key={detailtTypeValue.id} value={detailtTypeValue.id} primaryText={detailtTypeValue.value} />;
			})
			: undefined;
		return <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={styles.tableHeaderPadding}>
			<TableRow key="header-row">
				<TableHeaderColumn className="detail-header-column">
					{detailTypes !== undefined && detailTypes.length > 0 ? <DropDownMenu style={styles.customWidth} value={this.state.selectedDetailTypeId || -1} onChange={this.detailTypeChangeHandler.bind(this)}>
						{detailTypes}
						<MenuItem style={styles.displayNone} value={-1} primaryText="Выберите значение" />
					</DropDownMenu> : <DropDownMenu style={styles.customWidth} value={-1}>
							<MenuItem value={-1} primaryText="Пусто"/>
						</DropDownMenu>}
						</TableHeaderColumn>
				<TableHeaderColumn className="detail-header-column">
					{detailTypeValues !== undefined && detailTypeValues.length > 0? <DropDownMenu style={styles.customWidth} value={this.state.selectedDetailTypeValueId || -1} onChange={this.detailTypeValueChangeHandler.bind(this)}>
						{detailTypeValues}
						<MenuItem style={styles.displayNone} value={-1} primaryText="Выберите значение" />
					</DropDownMenu> : <DropDownMenu style={styles.customWidth} value={-1}>
						                  <MenuItem value={-1} primaryText="Пусто" />
						</DropDownMenu>}
						</TableHeaderColumn>
				<TableHeaderColumn style={styles.tableActionColumn}>
					<FlatButton onClick={this.addDetailClickHandler.bind(this)}>+</FlatButton>
						</TableHeaderColumn>
					</TableRow>
		</TableHeader>;
	}

	getTableBody() {
		const removeButtonClickHandler = this.removeDetailClickHandler.bind(this);
		let detailsMenuItems = this.state.existingDetails.map(function(detail) {
			return <TableRow key={detail.detailValue.id} selectable={false}>
						<TableRowColumn>{detail.detailValue.detailType.name}</TableRowColumn>
						<TableRowColumn>{detail.detailValue.value}</TableRowColumn>
						<TableRowColumn style={styles.tableActionColumn}>
					<FlatButton detail={detail} onClick={() => removeButtonClickHandler(detail)}>-</FlatButton>
						</TableRowColumn>
					</TableRow>;
		});
		return <TableBody displayRowCheckbox={false}>{detailsMenuItems}</TableBody>;
	}

	removeDetailClickHandler(detail) {
		if (detail.id !== undefined) {
			let toRemove = this.state.detailsToDelete;
			toRemove.push(detail);
			this.state.detailsToDelete = toRemove;
		}
		let existing = this.state.existingDetails;
		existing.splice(existing.indexOf(detail), 1);
		this.setState({ existingDetails: existing }, console.log('remove clicked: ', detail));
	}

	componentWillMount() {
		const detailsQueryString = "itemId=" + this.state.itemId;
		const detailTypesQueryString = "categoryId=" + this.state.categoryId;
		const detailTypeValuesQueryString = "categoryId=" + this.state.categoryId;
		const detailsCallback = this.setExistingDetails.bind(this);
		const detailTypesCallback = this.setDetailTypes.bind(this);
		const detailTypeValuesCallback = this.setDetailTypeValues.bind(this);
		DataService.getItemsWithParameters(detailsController, detailsQueryString, detailsCallback);
		DataService.getItemsWithParameters(detailTypesController, detailTypesQueryString, detailTypesCallback);
		DataService.getItemsWithParameters(detailTypeValuesController, detailTypeValuesQueryString, detailTypeValuesCallback);
	}

	render() {
		let muiTheme = getMuiTheme({
			palette: {
				textColor: pink500,
				canvasColor: DarkBaseTheme.palette.canvasColor
			}
		});
		const tableHeader = this.getTableHeader();
		const tableBody = this.getTableBody();
		const controls = <Table>
			{tableHeader}
			{tableBody}
		</Table>;

		return <MuiThemeProvider muiTheme={muiTheme}>
			<Dialog id="add-details-dialog" contentStyle={{ width: "40%", maxWidth: '40%' }} title={"Manage details for item id: " + this.props.item.id } open={this.props.open} onRequestClose={this.handleClose.bind(this)}>
				<div className="details-dialog" >
					{controls}
				</div>
				<FlatButton id="save-details-button" label="Save" onClick={this.saveDetailsClickHandler.bind(this)} />
			</Dialog>
		</MuiThemeProvider>;
	}
}

export default AddDetailDialog;