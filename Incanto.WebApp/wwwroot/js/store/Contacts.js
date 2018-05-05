import React from "react";

class Contacts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div id="main-page-container" className="central-container ">
			<h1>Контакты</h1>
			<div id="contacts-container" style={{ width: "100%", textAlign: "center"}}>
				<div style={{
					width: "30%", display: "inline-block",
					textAlign: "left", verticalAlign: "top", paddingTop: "50px", paddingLeft: "5px" }}>
					<h2 style={{ paddingBottom: "10px" }}>Адрес и телефон</h2>
					<p>0 362-62-05-11</p>
					<p>incantowear@gmail.com</p>
					<p>г. Ровно,</p>
					<p>ул. Мицкевича 3</p>
				</div>
				<div style={{
					width: "30%", display: "inline-block",
					textAlign: "left", verticalAlign: "top", paddingTop: "50px", paddingLeft: "5px" }}>
					<h2 style={{paddingBottom: "10px"}}>Бесплатная доставка</h2>
					<p>Курьеры привезут Ваш заказ </p>
					<p>на дом или пункт самовывоза.</p>
					<p>В случае отказа от </p>
					<p>покупки - доставка бесплатная!</p>
				</div>
				<div style={{
					width: "25%", display: "inline-block",
					textAlign: "left", verticalAlign: "top", paddingTop: "50px" }}>
					<h2 style={{ paddingBottom: "10px" }}>Работа Call-Центра</h2>
					<p>10:00-19:00 ПН-ПТ</p>
					<p>10:00-17:00 СБ</p>
					<p>10:00-15:00 ВС</p>
				</div>
			</div>
		</div>;
	}
}

export default Contacts;