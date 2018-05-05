
import React from 'react';
import { Link } from "react-router-dom";
import { removeItem } from "../actions/CartActions";
import { connect } from 'react-redux';

const CartItem = (props) => {

	let item = props.item;
	return <tr style={{ borderBottom: "1px solid #b7b7b7" }} className="product_row">
		<td style={{textAlign: "center"}}>
			<Link to={`/item/${item.id}`}>
				<img className="cart-page-img" src={item.img} />
			</Link>
		       </td>
			<td width="120px">
			<p className="cart-prod-designer bold"><Link style={{ textDecoration: "none" }} to={`/item/${item.id}`}>{item.brand}</Link>
				</p><br />
				<span className="glf fs11 cart-prod-name">{item.name}</span><br />
				<span className="glf cart-prod-code">{item.identifier}</span><br />
			</td>
			<td align="center" className="grf fs11 cart-prod-size cart-column">
			{item.size}</td>
			<td align="center" className="grf fs11 cart-column">{item.count} шт.</td>
			<td align="center" className="grf fs11 cart-column">{item.oldPrice === 0 ? item.newPrice : item.oldPrice}грн</td>
			<td align="center" className="grf fs11 cart-column">{item.oldPrice === 0 ? "-" : item.newPrice + " грн"}</td>
			<td align="center" className="grf fs11 cart-prod-price">
			<span>{item.newPrice * item.count}</span>
				грн
		       </td>
			<td align="center" className="grf fs11" style={{ paddingRight: "20px" }} onClick={() => props.dispatch(removeItem(item)) }>
				<span className="delete_position">(X)</span>
			</td>
	</tr>;
}

export default connect()(CartItem);
