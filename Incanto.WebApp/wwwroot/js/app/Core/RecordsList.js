import React from "react";
import DataService from "./Services/DataService";
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
			selectedItem: {}
		};
		this.getDataForPage = this.getDataForPage.bind(this);
		this.updateData = this.updateData.bind(this);
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
		this.setState({ activePage: page });
	}

	resetPage() {
		this.setState({ activePage: 1 });
	}

	onRowSelection(id) {
		if (id.length > 0) {
			let item = this.getDataForPage()[id];
			this.state.selectedItem = item;
			console.log('updated state value', this.state.selectedItem);
			//console.log('updated state value', this.state.selectedItem.name);
		}


		//this.setState({ selectedItem: item },
		//          () => {
		//          });
		//  if(this.props.selectItem !== undefined) {
		//   this.props.selectItem(item.element);
		//  }
	}

	getTableRowColumns(row) {
		const rowColumns = this.props.columns.map(function (columnName) {
			let columnValue;
			let columnId;
			if("discounts")
			if (typeof (row[columnName]) === "object" && row[columnName] !== {} && row[columnName] !== [] && row[columnName] !== null ) {
				columnValue = row[columnName].name;
				columnId = row[columnName].id;
			} else {
				columnValue = row[columnName] !== undefined ? row[columnName] : "пусто";
				columnId = row.id;
			}
			return (<TableRowColumn key={columnId}> {columnValue} </TableRowColumn>);
			//(row[columnName] != null ? <TableRowColumn key={columnId}> {columnValue} </TableRowColumn> : <span />);
		});
		return rowColumns;
	}

	componentWillMount() {
		var processData = this.updateData;
		DataService.getItems(this.props.controller, processData);
		//RestApiCalls.get(this.props.url).then(response => {
		//	processData(response.data);
		//});
	}

	componentWillReceiveProps(nextProps) {
	    var processData = this.updateData;
		if (nextProps.controller != this.props.controller) {
		    DataService.getItems(nextProps.controller, processData);
			this.resetPage();
		}
		if (nextProps.shouldRefreshTable) {
		    DataService.getItems(this.props.controller, processData);
		    this.resetPage();
		}
	}

    shouldComponentUpdate(nextProps, nextState) {
		if (nextState.dataSource === this.state.dataSource && this.state.activePage == nextState.activePage) {
			return false;
		}
		return true;
    }

	render() {
		if (this.state.dataSource.length === 0) {
			return false;
		}
		const list = this.getDataForPage().map(record => {
			const rowColumns = this.getTableRowColumns(record);
			//rowColumns.push( <TableRowColumn key="Actions">{getActionCommands(item)}</TableRowColumn> );
			return (
				<TableRow key={record.id}>
					{rowColumns}
				</TableRow>
			);
		});

		const headerColumns = this.props.columns.map(function (column) {
			return (
				<TableHeaderColumn key={column}>{column}</TableHeaderColumn>
			);
		});
		// headerColumns.push(<TableHeaderColumn key="Actions">Actions</TableHeaderColumn>);
		const lastPage = ((this.state.dataSource.length) % this.state.itemsPerPage) !== 0 ? 1 : 0;
		const pages = Math.floor(this.state.dataSource.length / this.state.itemsPerPage) + lastPage;
		return <div>
			<Table
				onRowSelection={this.onRowSelection.bind(this)}
			>
				<TableHeader displaySelectAll={false}>
					<TableRow>
						{headerColumns}
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={true}>
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