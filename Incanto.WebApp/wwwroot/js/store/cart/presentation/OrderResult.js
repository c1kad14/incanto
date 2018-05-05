import React from "react";


const OrderResult = (props) => {
	const orderResult = props.success === true
		? <div className="order-result">
		<h2>Поздравляем!</h2>
		<p>Ваш заказ успешно оформлен!</p>
		<p>В ближайшее время с Вами свяжется наш представитель. Ожидайте.</p>
		<p>Хорошего Вам дня!</p>
	</div>
		: <div className="order-result">
			<h2>Произошла ошибка.</h2>
			<br/>
			<p>Проверьте пожалуйста правильность введенных Вами данных и попробуйте еще раз.</p>
			<p>Если ошибка повторится - свяжитесь пожалуйста с нашим представителем.</p>
			<p>Номера телефонов: 050-922-66-11</p>
			<p>Електронная почта: incantowear@gmail.com</p>
			<input className="submit submit-cart-page mb10" style={{marginTop: "25px"}}type="button" value="Повторить" onClick={props.tryAgain}/>
		  </div>;
	return orderResult;
}

export default OrderResult;