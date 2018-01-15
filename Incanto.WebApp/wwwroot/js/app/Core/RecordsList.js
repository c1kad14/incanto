import React from "react";
import DataService from "./Services/DataService";
import ImageUploader from "./Controls/ImageUploader";
import RaisedButton from "material-ui/RaisedButton";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from "material-ui/Table";
import ListPagination from "./ListPagination";

class RecordsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			itemsPerPage: 5,
			activePage: this.props.page === undefined ? 1 : this.props.page,
			selectedItem: undefined,
			selectedItemIndex: -1,
			uploaderActions: {}
		};
		this.getDataForPage = this.getDataForPage.bind(this);
		this.updateData = this.updateData.bind(this);
		this.formatHeaderName = this.formatHeaderName.bind(this);
	}

	updateData(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ dataSource: newData },
				() => {
					console.log('updated state value', this.state.dataSource);
				});
		}
	}

	getValueForField(row, columnName) {
		let fieldToGetValue = row;
		let result = undefined;

		let splittedChild = columnName.split("-");
		for (let j = 0; j < splittedChild.length; j++) {
			if (!splittedChild[j].includes(".")) {
				fieldToGetValue = fieldToGetValue[splittedChild[j]];
			} else {
				let splittedFieldAndName = splittedChild[j].split(".");
				fieldToGetValue = fieldToGetValue[splittedFieldAndName[0]];
				result = fieldToGetValue !== undefined && fieldToGetValue !== null ? fieldToGetValue[splittedFieldAndName[1]] : "пусто";
			}
		}

		return result;
	}

	openAddDialog() {
		if (this.state.uploaderActions.openDialog !== undefined) {
			this.state.uploaderActions.openDialog();
		}
	}

	getTableRowColumns(row) {
		let getValueForFieldFunc = this.getValueForField.bind(this);
		const rowColumns = this.props.columns.map(function (columnName) {
			let columnValue;
			let columnId;
			if (row[columnName] !== undefined) {
				columnValue = row[columnName] !== undefined && row[columnName] !== "" && row[columnName] !== null ? row[columnName] : "пусто";
				columnId = row.id;
			} else {
				let value = getValueForFieldFunc(row, columnName);
				columnValue = value !== undefined ? value : "пусто";
				columnId = row.id;
			}
			return (<TableRowColumn key={columnId}> {columnValue} </TableRowColumn>);
			//(row[columnName] != null ? <TableRowColumn key={columnId}> {columnValue} </TableRowColumn> : <span />);
		});
		//if (this.props.controller === "items") {
		//	rowColumns.push(<TableRowColumn key={row.id}><RaisedButton onClick={this.openAddDialog.bind(this)} label="add photo" fullWidth={true} />
		//		<ImageUploader baseItemId={row.id}
		//			uploaderActions={this.state.uploaderActions}
		//			uploadController="Photos" />
		//	</TableRowColumn>);
		//}
		
		return rowColumns;
	}

	getDataForPage() {
		if (this.state.dataSource != null) {
			const dataForPage = [];
			const start = (this.state.activePage - 1) * this.state.itemsPerPage;
			const last = start + this.state.itemsPerPage;
			for (let i = start; i < last; i++) {
				if (i < this.state.dataSource.length) {
					dataForPage.push(this.state.dataSource[i]);
				}
			}
			return dataForPage;
		}
		return null;
	}

	selectPage(page) {
		this.setState({ activePage: page }, this.props.itemSelectedHandler(undefined));
	}

	resetPage() {
		this.setState({
			activePage: 1,
			selectedItem: undefined,
			selectedItemIndex: -1
		},
			this.props.resetCallBack
		);
	}

	onRowSelection(selectedRows) {
		if (selectedRows.length > 0) {
			let item = this.getDataForPage()[selectedRows[0]];
			this.state.selectedItem = item;
			this.props.itemSelectedHandler(item);
			this.state.selectedItemIndex = selectedRows[0];
			console.log('updated state value', this.state.selectedItem);
		} else {
			this.setState({ selectedItem: undefined, selectedItemIndex: -1 }, this.props.itemSelectedHandler(undefined));
		}
	}

	componentWillMount() {
		var processData = this.updateData;
		DataService.getItems(this.props.controller, processData);
	}

	componentWillReceiveProps(nextProps) {
		let processData = this.updateData;
		if (nextProps.controller !== this.props.controller || nextProps.shouldRefreshTable) {
			DataService.getItems(nextProps.controller, processData);
			this.resetPage();
		} else {
			return;
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		//if (nextState.selectedItemIndex !== this.state.selectedItemIndex) {
		//	return true;
		//}
		if (nextState.dataSource === this.state.dataSource) {
			if (nextProps.controller !== this.props.controller) {
				return false;
			}
			if (this.state.activePage !== nextState.activePage) {
				return true;
			}
			return false;
		}
		return true;
	}

	formatHeaderName(column) {
		let splitted = column.split("-");
		return splitted[splitted.length - 1].split(".")[0];
	}

	render() {
		if (this.state.dataSource.length === 0) {
			return false;
		}
		const list = this.getDataForPage().map(record => {
			const rowColumns = this.getTableRowColumns(record);
			return (
				<TableRow key={record.id}>
					{rowColumns}
				</TableRow>
			);
		});

		const headerColumns = this.props.columns.map(column => {
			return (
				<TableHeaderColumn key={column}>{this.formatHeaderName(column)}</TableHeaderColumn>
			);
		});
		const lastPage = ((this.state.dataSource.length) % this.state.itemsPerPage) !== 0 ? 1 : 0;
		const pages = Math.floor(this.state.dataSource.length / this.state.itemsPerPage) + lastPage;
		return <div>
			<Table
				onRowSelection={this.onRowSelection.bind(this)}>
				<TableHeader displaySelectAll={false}>
					<TableRow>
						{headerColumns}
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
					{list}
				</TableBody>
			</Table>
			<ListPagination
				page={this.state.activePage}
				availablePages={pages}
				selectPage={this.selectPage.bind(this)}
				activePage={this.state.activePage} />
		</div>;
	}

}

module.exports = RecordsList;