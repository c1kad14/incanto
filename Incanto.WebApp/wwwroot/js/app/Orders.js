import React from "react";
import RecordsList from "./Core/RecordsList";
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import OrderDetailsDialog from "./Core/OrderDetailsDialog";

const columns = ["id", "total", "orderTime", "status"];
class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldRefreshTable: false,
			selectedItem: undefined,
			addDetailsDialogOpen: false

		}
	}

	itemSelectedHandler(item) {
		this.setState({ selectedItem: item });
	}
	resetCallBack() {
		this.setState({ shouldRefreshTable: false, selectedItem: undefined });
	}
	addDetailsDialogOpenHandler() {
		this.setState({ addDetailsDialogOpen: true });
	}
	addDetailsDialogCloseHandler() {
		this.state.shouldRefreshTable = true;
		this.setState({ addDetailsDialogOpen: false });
	}
	render() {
		return <div>
			<Toolbar>
				<ToolbarGroup>
					<ToolbarTitle text="Заказы" />
					{this.state.selectedItem !== undefined ? <RaisedButton label="Детали" primary={true} onClick={this.addDetailsDialogOpenHandler.bind(this)} /> : <span />}
					{this.state.addDetailsDialogOpen ? <OrderDetailsDialog columns={this.props.columns} open={this.state.addDetailsDialogOpen} close={this.addDetailsDialogCloseHandler.bind(this)} refreshDataTable={this.state.shouldRefreshTable} recordToUpdate={this.state.selectedItem} />
						: <span />}
				</ToolbarGroup>
			</Toolbar>
			<RecordsList columns={columns} controller="order" shouldRefreshTable={this.state.shouldRefreshTable} itemSelectedHandler={this.itemSelectedHandler.bind(this)} resetCallBack={this.resetCallBack.bind(this)} />
		</div>;
	}
}

export default Orders;