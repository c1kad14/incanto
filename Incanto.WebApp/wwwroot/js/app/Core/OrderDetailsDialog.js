import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DataService from "./Services/DataService";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LightBaseTheme from 'material-ui/styles/baseThemes/LightBaseTheme';
import { blueGrey800 } from 'material-ui/styles/colors';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class OrderDetailsDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recordToUpdate: this.props.recordToUpdate
		}

	}

	handleClose() {
		this.props.close(false);
	}


	statusChanged(event, index, value) {
		this.state.recordToUpdate["status"] = value;
		this.setState({ });
	}
	changeStatusHandle() {
		let model = {
			id: this.state.recordToUpdate.id,
			status: this.state.recordToUpdate.status
		};
		DataService.updateObject("order", model, this.props.refreshDataTable);
		this.handleClose();
	}

	render() {
		const customer = <div>
			<p>Имя: {this.state.recordToUpdate.customer.lastName} {this.state.recordToUpdate.customer.firstName} {this.state
				.recordToUpdate.customer.middleName} </p>

			<p>Время заказа: {this.state.recordToUpdate.orderTime}</p>

			<p>Телефон: {this.state.recordToUpdate.customer.phone}</p>
			<p>Почта: {this.state.recordToUpdate.customer.email}</p>

			<p>Тип доставки: {this.state.recordToUpdate.customer.deliveryType}</p>
			<p>Способ оплаты: {this.state.recordToUpdate.customer.paymentType}</p>
			<p>Адрес: {this.state.recordToUpdate.customer.region}, {this.state.recordToUpdate.customer.city}, {this.state
				.recordToUpdate.customer.deliveryAddress} </p>

			<p>Комментарии: {this.state.recordToUpdate.comments}</p>
		</div>;

		let orderItems = this.state.recordToUpdate.orderItems.map((item) => {
			return <li key={item.id}>Артикул: {item.existingItem.item.identifier}
						<br />Размер: {item.existingItem.size.name}
						<br />Цена за 1 шт: {item.orderPrice} грн.
						<br />Количество: {item.count} шт.<br /> <br /></li>;
		});

		let dialogActions = [
			<FlatButton id="close-dialog" label="Отмена" onClick={this.handleClose.bind(this)} secondary={true} />,
			<FlatButton id="edit-existing-record-button" label="Сохранить" onClick={this.changeStatusHandle.bind(this)} primary={true} />
		];

		

		let muiTheme = getMuiTheme({
			palette: {
				textColor: blueGrey800,
				canvasColor: LightBaseTheme.palette.canvasColor
			}
		});

		return <MuiThemeProvider muiTheme={muiTheme}>
			<Dialog actions={dialogActions} fullWidth={false} id="add-new-record-dialog" title={"Заказ номер " + this.state.recordToUpdate.id} open={this.props.open} onRequestClose={this.handleClose.bind(this)}
			        autoScrollBodyContent={true}>
				<ul>
					{customer}
					<br/>
					{orderItems}
					<br />
					Общая сумма: {this.state.recordToUpdate.total} грн.
					<br />
					<DropDownMenu value={this.state.recordToUpdate.status} onChange={this.statusChanged.bind(this)}>
						<MenuItem value="REVIEW" primaryText="REVIEW" />
						<MenuItem value="ACCEPTED" primaryText="ACCEPTED" />
						<MenuItem value="CLOSED" primaryText="CLOSED" />
						<MenuItem value="DECLINED" primaryText="DECLINED" />
					</DropDownMenu>
				</ul>
			</Dialog>
		</MuiThemeProvider>;
	}
}

module.exports = OrderDetailsDialog;