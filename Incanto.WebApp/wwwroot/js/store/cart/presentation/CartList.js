import React from 'react';
import CartItem from "./CartItem";

const CartList = (props) => {

	const cartContent = props.cartItems.map((item, index) => {
		return <CartItem key={index} item={item}/>;
	});
	return <table className="cart-main-table">
		<tbody><tr style={{ borderBottom: "1px solid #b7b7b7"}}>
		       <td align="center" className="main-table-head" colSpan="2">Название</td>
			   <td align="center" className="main-table-head cart-column">Размер</td>
			   <td align="center" className="main-table-head cart-column">Количество</td>
			   <td align="center" className="main-table-head cart-column">Цена</td>
		       <td align="center" className="main-table-head cart-column">С учетом скидки</td>
		       <td align="center" className="main-table-head">Всего</td>
		       <td align="center" className="main-table-head"></td>
		</tr>
			{cartContent}
		       </tbody>
			</table>;
}

export default CartList;