import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import IncantoRecords from "../../IncantoRecords";
import ImageUploader from "./ImageUploader";
import RaisedButton from "material-ui/RaisedButton";

class Logged extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'IconMenu'
		}
	}

	render() {
		return <div>
			<IconMenu
				//{...props}
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
			</IconMenu>
		</div>;
	}
}



class IncantoAppBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showRecordsTable: false,
			recordsTabIndex: 0,
			uploaderActions: {}
		}
	}

	handleTouchMap() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	handleMenuRecordsClick() {
		this.setState({ showRecordsTable: true, showPhotosGrid: false });
	}

	handleMenuPhotosClick() {
		this.setState({ showPhotosGrid: true, showRecordsTable: false });
	}

	handleRecordsTabChange() {
		this.setState({
			recordsTabIndex: value
		});
	}

	openAddDialog() {
		if (this.state.uploaderActions.openDialog !== undefined) {
			this.state.uploaderActions.openDialog();
		}
	}

	render() {
		return (
			<div>
				<AppBar
					title="Incanto"
					onLeftIconButtonTouchTap={this.handleTouchMap.bind(this)}
					iconElementRight={ <Logged />}
				/>
				{(this.state.showRecordsTable === true) ? <IncantoRecords /> : <span />}
				{(this.state.showPhotosGrid === true) ? <div><RaisedButton onClick={this.openAddDialog.bind(this)} label="add photo" fullWidth={true} />
					<ImageUploader baseItemId={1}
						uploaderActions={this.state.uploaderActions}
						uploadController="Photos" />
				</div> : <span />}
				<Drawer
					open={this.state.menuOpen}
					onRequestChange={open => this.setState({ menuOpen: open })}
					docked={false}>

					<MenuItem onClick={this.handleMenuRecordsClick.bind(this)}>Записи</MenuItem>
					<MenuItem onClick={this.handleMenuPhotosClick.bind(this)}>Фото</MenuItem>
					<MenuItem>Баннеры</MenuItem>
					<MenuItem>Реклама</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default IncantoAppBar;