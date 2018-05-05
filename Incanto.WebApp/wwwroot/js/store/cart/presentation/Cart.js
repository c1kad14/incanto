import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDom from "react-dom";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import CartOrderForm from "./CartOrderForm";
import {
	Step,
	Stepper,
	StepLabel,
	StepContent,
} from 'material-ui/Stepper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RestApiCalls from "../../../app/Core/Services/RestApiCalls";
import OrderResult from "./OrderResult";

import { clearCart } from "../actions/CartActions";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0,
			disabled: false,
			orderInfo: {
				phone: "",
				firstName: "",
				lastName: "",
				middleName: "",
				email: "",
				region: "",
				city: "",
				postal: "",
				delivery: "",
				payment: "",
				street: "",
				warehouse: "",
				comments: ""
			},
			orderResult: undefined
		}
		this.handleNext = this.handleNext.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
	}

	handleNext() {
		const { stepIndex } = this.state;
		if (stepIndex < 2) {
			this.setState({ stepIndex: stepIndex + 1, disabled: false });
		}
	}

	handlePrev() {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	}
	componentDidUpdate() {
		const node = ReactDom.findDOMNode(this);
		if (node !== null) {
			node.scrollIntoView();
		}
	}

	makeOrderHandleClick(e) {
		this.setState({disabled: true});
		const that = this;
		let items = [];
		this.props.cartItems.cartReducer.map((cartItem) => {
			items.push({
				"id": cartItem.id,
				"identifier": cartItem.identifier,
				"size": cartItem.size,
				"count": cartItem.count
			});
		});
		let order = {
			"orderInfo": this.state.orderInfo,
			"items": items
		};
		RestApiCalls.post(`/api/Order/MakeOrder`, order).then((response) => {
			if (response.data.success) {
				that.props.dispatch(clearCart());
			}
			that.setState({ stepIndex: 0, orderResult: response.data.success});
		});
	}

	tryAgain() {
		this.setState({ orderResult: undefined });
	}

	render() {
		let cartItems = this.props.cartItems.cartReducer;
		let cartItemsCount = 0;
		let total = 0;
		cartItems.map((item) => {
			total += (item.count * item.newPrice);
			cartItemsCount += item.count;
		});
		let { stepIndex } = this.state;
		const header = cartItemsCount === 0 || this.state.orderResult !== undefined?
			this.state.orderResult === undefined ? <h3>ВАША КОРЗИНА ПУСТА</h3> : <OrderResult success={this.state.orderResult} tryAgain={this.tryAgain.bind(this)}/>
			: <h3> В КОРЗИНЕ {cartItemsCount} ТОВАРОВ</h3>;
		const content = <div className="cart-table-wrapper">
			<CartList cartItems={cartItems} />
			<CartSummary handleNext={this.handleNext} items={cartItems} />
		</div>;

		return <MuiThemeProvider
			muiTheme={getMuiTheme()}>
			<div className="central-container">
				{header}
				{cartItemsCount === 0 || this.state.orderResult !== undefined ? <span /> : <Stepper
					activeStep={stepIndex}
					linear={false}
					orientation="vertical"
					style={{ width: "100%" }}>
					<Step>
						<StepLabel>
							Выберите товары в Вашей корзине
						                                   </StepLabel>
						<StepContent>
							{content}
						</StepContent>
					</Step>
					<Step>
						<StepLabel>
							Выберите способ доставки и оплаты
						                                   </StepLabel>
						<StepContent>
							<CartOrderForm orderInfo={this.state.orderInfo}/>
							<div className="cart-nav-buttons cart-main-table-footer">
								<div style={{ width: "100%" }}>
									<button id="cart-order" className="submit submit-cart-page mb10" style={{ display: "inline", width: "45%" }} onClick={this.handlePrev}>Назад</button>
									<button id="cart-order" className="submit submit-cart-page mb10" style={{ display: "inline", marginLeft: "10px", width: "45%" }} onClick={this.handleNext}>Вперед</button>
								</div>
							</div>
						</StepContent>

					</Step>
					<Step>
						<StepLabel>
							Проверьте информацию о Вашем заказе
						</StepLabel>
						<StepContent>
							<h3>Детали заказа:</h3>
							<p>Имя: {this.state.orderInfo.lastName} {this.state.orderInfo.firstName} {this.state.orderInfo.middleName}</p>
							<p>Адрес электронной почты: {this.state.orderInfo.email}</p>
							<p>Контактный телефон: {this.state.orderInfo.phone}</p>
							<p>Способ доставки: {this.state.orderInfo.delivery}</p>
							<p>Адрес доставки: {this.state.orderInfo.region},  {this.state.orderInfo.city}, {this.state.orderInfo.delivery === "Самовывоз" ? this.state.orderInfo.warehouse : this.state.orderInfo.street}</p>
							<p>Способ оплаты: {this.state.orderInfo.payment}</p>
							<p>Количество товаров: {cartItemsCount} шт.</p>
							<p>Комментарии: {this.state.orderInfo.comments}</p>
							<p>Сумма: {total} грн.</p>
							<div className="cart-nav-buttons cart-main-table-footer">
								<div style={{ width: "100%" }}>
									{this.state.disabled ? <CircularProgress /> : <div>
										<button d="cart-order" className="submit submit-cart-page mb10" style={{ display: "inline", width: "45%" }} onClick={this.handlePrev}>Назад</button>
										<button id="cart-order" className="submit submit-cart-page mb10" style={{ display: "inline", marginLeft: "10px", width: "45%" }} onClick={this.makeOrderHandleClick.bind(this)}>Подтвердить</button>
										</div>
											}
									
								</div>
							</div>
						</StepContent>

					</Step>
				</Stepper>}
			</div>
		</MuiThemeProvider>;
	}

}


function mapStateToProps(state) {
	return {
		cartItems:
		state
	};
}

export default connect(mapStateToProps)(Cart);
