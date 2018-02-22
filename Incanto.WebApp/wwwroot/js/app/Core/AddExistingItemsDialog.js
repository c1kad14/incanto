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
import TextField from "material-ui/TextField";
import RestApiCall from "./Services/RestApiCalls";
import DataService from "./Services/DataService";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DarkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { pink500 } from 'material-ui/styles/colors';

const existingItemsController = "ExistingItems";
const sizesController = "Sizes";

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
	},
	marginBottom: {
		width: "225px",
		marginBottom: "15px"
	}

};

class AddExistingItemsDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryId: this.props.item.category.id,
			itemId: this.props.item.id,
			selectedSizeId: undefined,
			sizes: [],
			existingItems: [],
			existingItemsToDelete: [],
			amount: ""
		}
	}

	handleClose() {
		this.props.close(false);
	}

	saveExistingItemsClickHandler() {
		let existingItems = this.state.existingItems.filter((existingItem) => {
			return existingItem.id === undefined;
		});
		if (existingItems.length > 0) {
			RestApiCall.post(`/api/${existingItemsController}/AddList`, existingItems);
		}

		if (this.state.existingItemsToDelete.length > 0) {
			this.state.existingItemsToDelete.map((existingItem) => {
				DataService.deleteObject(existingItemsController, existingItem);
			});
		}
		this.handleClose();
	}

	setExistingItems(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ existingItems: newData },
				() => {
					console.log('updated existingItems value', this.state.existingItems);
				});
		}
	}

	setSizes(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ sizes: newData },
				() => {
					console.log('updated sizes value', this.state.sizes);
				});
		}
	}

	sizeChangeHandler(event, index, value) {
		this.setState({ selectedSizeId: value });
	}

	textFieldHandleChange(event) {
		this.setState({
			amount: event.target.value
		});
	}

	addExistingItemClickHandler() {
		let existingItems = this.state.existingItems;

		const sizeValue = this.state.sizes.filter((size) => {
			return size.id === this.state.selectedSizeId;
		});
		let contains = existingItems.filter((existingItem) => {
			return existingItem.size.id === this.state.selectedSizeId;
		});
		if (this.state.selectedSizeId !== undefined && contains.length === 0) {
			if (this.state.amount !== "" && this.state.amount !== undefined) {
				let newSize = {
					itemId: this.state.itemId,
					size: sizeValue[0],
					amount: this.state.amount
				};
				existingItems.push(newSize);
				this.setState({
						existingItems: existingItems,
						amount: "",
						selectedSizeId: undefined
					},
					() => {
						console.log('updated existing items', this.state.existingItems);
					});
			}
			
		}

	}

	getTableHeader() {
		const sizesForSelectedCategory = this.state.categoryId !== undefined ? this.state.sizes.filter((size) => {
			return size.category.id === this.state.categoryId;
		}) : undefined;

		const sizes = sizesForSelectedCategory !== undefined ? sizesForSelectedCategory.map((size) => {
			return <MenuItem key={size.id} value={size.id} primaryText={size.name} />;
		}) : undefined;

		return <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={styles.tableHeaderPadding}>
			<TableRow key="header-row">
				<TableHeaderColumn className="detail-header-column">
					{sizes !== undefined && sizes.length > 0 ? <DropDownMenu style={styles.customWidth} style={styles.marginBottom} value={this.state.selectedSizeId || -1} onChange={this.sizeChangeHandler.bind(this)}>
						{sizes}
						<MenuItem style={styles.displayNone} value={-1} primaryText="Выберите значение" />
					</DropDownMenu> : <DropDownMenu style={styles.customWidth} value={-1}>
							<MenuItem value={-1} primaryText="Пусто" />
						</DropDownMenu>}
				</TableHeaderColumn>
				<TableHeaderColumn className="detail-header-column">
					<TextField hintText="Количество" onChange={this.textFieldHandleChange.bind(this)} value={this.state.amount} />
				</TableHeaderColumn>
				<TableHeaderColumn style={styles.tableActionColumn}>
					<FlatButton onClick={this.addExistingItemClickHandler.bind(this)}>+</FlatButton>
				</TableHeaderColumn>
			</TableRow>
		</TableHeader>;
	}

	getTableBody() {
		const removeButtonClickHandler = this.removeExistingItemClickHandler.bind(this);
		let existingItemsMenuItems = this.state.existingItems.map(function (existingItem) {
			return <TableRow key={existingItem.size.id} selectable={false}>
				<TableRowColumn>{existingItem.size.name}</TableRowColumn>
				<TableRowColumn>{existingItem.amount}</TableRowColumn>
				<TableRowColumn style={styles.tableActionColumn}>
					<FlatButton onClick={() => removeButtonClickHandler(existingItem)}>-</FlatButton>
				</TableRowColumn>
			</TableRow>;
		});
		return <TableBody displayRowCheckbox={false}>{existingItemsMenuItems}</TableBody>;
	}

	removeExistingItemClickHandler(existingItem) {
		if (existingItem.id !== undefined) {
			let toRemove = this.state.existingItemsToDelete;
			toRemove.push(existingItem);
			this.state.existingItemsToDelete = toRemove;
		}
		let existing = this.state.existingItems;
		existing.splice(existing.indexOf(existingItem), 1);
		this.setState({ existingItems: existing }, console.log('remove clicked: ', existingItem));
	}

	componentWillMount() {
		const existingItemsQueryString = "itemId=" + this.state.itemId;
		const sizesQueryString = "categoryId=" + this.state.categoryId;
		const existingItemsCallback = this.setExistingItems.bind(this);
		const sizesCallback = this.setSizes.bind(this);
		RestApiCall.get(`/api/${existingItemsController}/GetListByItemId?${existingItemsQueryString}`).then((response) => {
			existingItemsCallback(response.data);
		});
		RestApiCall.get(`/api/${sizesController}/GetObjectsByCategoryId?${sizesQueryString}`).then((response) => {
			sizesCallback(response.data);
		});
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

		let dialogActions = [
			<FlatButton id="close-dialog" label="Отмена" onClick={this.handleClose.bind(this)} secondary={true} />,
			<FlatButton id="save-details-button" label="Save" onClick={this.saveExistingItemsClickHandler.bind(this)} primary={true} />
		];

		return <MuiThemeProvider muiTheme={muiTheme}>
			<Dialog id="add-details-dialog" actions={dialogActions} contentStyle={{ width: "40%", maxWidth: '40%' }} title={"Редактикторовать размеры для товара с id: " + this.props.item.id} open={this.props.open} onRequestClose={this.handleClose.bind(this)}>
				<div className="details-dialog" >
					{controls}
				</div>
			</Dialog>
		</MuiThemeProvider>;
	}
}

export default AddExistingItemsDialog;