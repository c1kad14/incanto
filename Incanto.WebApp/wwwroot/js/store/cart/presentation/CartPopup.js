import React from "react";

const CartPopup = (props) => {
	const item = props.item;
	return <div id="cart" style={{ background: "rgba(255, 255, 255, 0.9)"}}>
		<div className="cart-image" >
			<img src={item.img} />
		</div>
		<div className="info">
			<h3>ТОВАР ДОБАВЛЕН:</h3>
			<p className="bold">{item.brand}</p>
			<p>{item.name}</p>
			<p>Размер: {item.size}</p>
			<p>{item.newPrice} грн.</p>
		</div>
	</div>;
}

export default CartPopup;