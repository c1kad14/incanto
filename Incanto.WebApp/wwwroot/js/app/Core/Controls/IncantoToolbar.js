﻿import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import AddRecordDialog from "../AddRecordDialog";
import AddDetailDialog from "../AddDetailsDialog";
import ImageUploader from "./ImageUploader";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default class IncantoToolbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.controller,
			addRecordDialogOpen: false,
			addDetailsDialogOpen: false,
			uploaderActions: {}
		};
	}

	handleChange(event, index, value) {
	    this.state.value = value;
	    let controller = value;
		this.props.selectedTableChangedHandler(controller);
	}

	addRecordDialogOpenHandler() {
		this.setState({ addRecordDialogOpen: true });
	}

	addRecordDialogCloseHandler(addRecordDialogOpen) {
		this.setState({addRecordDialogOpen});
	}

	addDetailsDialogOpenHandler() {
		this.setState({ addDetailsDialogOpen: true });
	}

	addDetailsDialogCloseHandler(addDetailsDialogOpen) {
		this.setState({ addDetailsDialogOpen });
	}

	openAddDialog() {
		if (this.state.uploaderActions.openDialog !== undefined && this.props.selectedItem !== undefined) {
			this.state.uploaderActions.openDialog(this.props.selectedItem);
		}
	}

	//componentWillReceiveProps(nextProps) {
	//	if (nextProps.selectedItem !== this.props.selectedItem) {
	//		this.setState();
	//	}
	//}

	render() {
		return (
			<Toolbar>
				<ToolbarGroup firstChild={true}>
					<DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
						<MenuItem value="countries" primaryText="Страны" />
						<MenuItem value="brands" primaryText="Бренды" />
						<MenuItem value="types" primaryText="Типы товаров" />
						<MenuItem value="categories" primaryText="Категории" />
						<MenuItem value="detailtypes" primaryText="Типы деталей" />
						<MenuItem value="detailtypevalues" primaryText="Значения деталей" />
						<MenuItem value="items" primaryText="Товары" />
						<MenuItem value="discounts" primaryText="Дискаунт" />
					</DropDownMenu>
				</ToolbarGroup>
				<ToolbarGroup>
					{this.state.addDetailsDialogOpen ? <AddDetailDialog open={this.state.addDetailsDialogOpen} close={this.addDetailsDialogCloseHandler.bind(this)} item={this.props.selectedItem} /> : <span></span>}
					<ToolbarTitle text="Записи" />
					{this.props.controller === "items" && this.props.selectedItem !== undefined ?<ToolbarSeparator /> : <span></span>}
					<FontIcon className="muidocs-icon-custom-sort" />
					{this.props.controller === "items" && this.props.selectedItem !== undefined ?
							<div>
								<RaisedButton onClick={this.openAddDialog.bind(this)} label="Фото" fullWidth={true} /><ImageUploader selectedItem={this.props.selectedItem}
									uploaderActions={this.state.uploaderActions}
									uploadController="Photos" />
							</div> : <span></span>}
					<ToolbarSeparator />
					<RaisedButton label="Добавить" primary={true} onClick={this.addRecordDialogOpenHandler.bind(this)} />
					{this.state.addRecordDialogOpen ? <AddRecordDialog columns={this.props.columns} lookup={this.props.lookupFields} controller={this.props.controller} open={this.state.addRecordDialogOpen} close={this.addRecordDialogCloseHandler.bind(this)} />
						: <span />}
					<IconMenu
						iconButtonElement={
							<IconButton touch={true}>
								<NavigationExpandMoreIcon />
							</IconButton>
						}
					>
						<MenuItem primaryText="Refresh" onClick={this.props.updateDataTable} />
						<MenuItem primaryText="Download" />
					</IconMenu>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}


module.exports = IncantoToolbar;