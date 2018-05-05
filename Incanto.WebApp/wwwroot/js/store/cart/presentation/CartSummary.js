import React from 'react';

const CartSummary = (props) => {
	let total = 0;
	props.items.map((item) => { total += (item.count * item.newPrice) });

	return <div className="cart-main-table-footer clear">
		<div style={{ width: "100%" }} >
			<table className="mb10" style={{ width: "100%" }}>
				<tbody><tr>
					<td align="left" style={{ verticalAlign: "top" }}>
						<div className="cart-page-summary grf fs10">
							<b>Всего к оплате:</b>
						</div>
					</td>
					<td align="right" style={{ verticalAlign: "top" }}>
						<div className="cart-page-cost grf fs10">
							<b>{total} грн</b>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
			<button id="cart-order" className="submit submit-cart-page mb10" onClick={props.handleNext}>Оформить заказ</button>
		</div>
	</div>;
}

export default CartSummary;