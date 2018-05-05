import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import IncantoRecords from "../../IncantoRecords";
import RestApiCalls from "../Services/RestApiCalls";
import MainPageTemplatePage from "./MainPageTemplatePage";
import Orders from "../../Orders";

class Logged extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'IconMenu'
		}
	}
	signOut() {
		RestApiCalls.post("incantostoreadminpage/logout").then(() => window.location.reload());
	}

	render() {
		return <div>
			<IconMenu

				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				
				<MenuItem primaryText="Sign Out" onClick={this.signOut}>
				</MenuItem>
			</IconMenu>
		</div>;
	}
}

class IncantoAppBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showRecordsTable: false,
			showMainPageTemplate: false,
			showOrders: false,
			recordsTabIndex: 0,
			uploaderActions: {}
		}
	}

	handleTouchMap() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	handleMenuRecordsClick() {
		this.setState({ showRecordsTable: true, showMainPageTemplate: false, showOrders: false, menuOpen: !this.state.menuOpen });
	}

	handleMainPageClick() {
		this.setState({ showMainPageTemplate: true, showRecordsTable: false, showOrders: false, menuOpen: !this.state.menuOpen });
	}

	handleOrdersClick() {
		this.setState({ showMainPageTemplate: false, showRecordsTable: false, showOrders: true, menuOpen: !this.state.menuOpen });
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
				{(this.state.showMainPageTemplate === true) ? <MainPageTemplatePage /> : <span />}
				{(this.state.showOrders === true) ? <Orders /> : <span />}
				<Drawer
					open={this.state.menuOpen}
					onRequestChange={open => this.setState({ menuOpen: open })}
					docked={false}>

					<MenuItem onClick={this.handleMenuRecordsClick.bind(this)}>Записи</MenuItem>
					<MenuItem onClick={this.handleOrdersClick.bind(this)}>Заказы</MenuItem>
					<MenuItem onClick={this.handleMainPageClick.bind(this)}>Главная</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default IncantoAppBar;