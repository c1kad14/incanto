import React from "react";
import RestApiCalls from "../../../app/Core/Services/RestApiCalls";

let newPostRequestModel = {
	"regions": {
		"apiKey": "dc6b6b103a1f62438bc55883294d36a5",
		"modelName": "Address",
		"calledMethod": "getAreas",
		"methodProperties": {
			"Language": "ru"
		}
	},
	"cities": {
		"modelName": "Address",
		"calledMethod": "getCities",
		"apiKey": "dc6b6b103a1f62438bc55883294d36a5",
		"methodProperties": {
			"Language": "ru"
		}
	},
	"warehouses": {
		"modelName": "AddressGeneral",
		"calledMethod": "getWarehouses",
		"methodProperties": {
			"Language": "ru"
		},
		"apiKey": "dc6b6b103a1f62438bc55883294d36a5"
	}


}
const url = "https://api.novaposhta.ua/v2.0/json/";

class CartOrderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderInfo: props.orderInfo,
			regions: [],
			cities: [],
			streets: [],
			warehouses: [],
			selectedRegionRef: "",
			selectedCityRef: ""
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		const that = this;
		let regions = RestApiCalls.post(url, newPostRequestModel["regions"]).then((response) => {
			if (response.data.success === true) {
				return response.data.data;
			}
			return [];
		});

		let cities = RestApiCalls.post(url, newPostRequestModel["cities"]).then((response) => {
			if (response.data.success === true) {
				return response.data.data;
			}
			return [];
		});

		let warehouses = RestApiCalls.post(url, newPostRequestModel["warehouses"]).then((response) => {
			if (response.data.success === true) {
				return response.data.data;
			}
			return [];
		});

		Promise.all([regions, cities, warehouses]).then(function (values) {

			const regionValue = that.state.orderInfo.region;
			const cityValue = that.state.orderInfo.city;
			that.state.regions = values[0];
			that.state.cities = values[1];
			that.state.warehouses = values[2];
			if (regionValue !== "") {
				const selectedRegionRef = that.state.regions.filter((region) => region.Description === regionValue);
				if (selectedRegionRef.length > 0) {
					that.state.selectedRegionRef = selectedRegionRef[0].Ref;
				}
			}
			if (cityValue !== "") {
				const selectedCityRef = that.state.cities.filter((city) => city.DescriptionRu === cityValue);
				if (selectedCityRef.length > 0) {
					that.state.selectedCityRef = selectedCityRef[0].Ref;
				}
			}
			that.setState({});

		});
		
	}

	handleChange(value, field) {
		this.state.orderInfo[field] = value;
		this.props.orderInfo[field] = value;
		if (field === "region") {
			this.state.orderInfo["city"] = "";
			this.props.orderInfo["city"] = "";
			this.state.orderInfo["warehouse"] = "";
			this.props.orderInfo["warehouse"] = "";
			const selectedRegionRef = this.state.regions.filter((region) => region.Description === value);
			if (selectedRegionRef.length > 0) {
				this.state.selectedRegionRef = selectedRegionRef[0].Ref;
			} else {
				this.state.selectedRegionRef = "";
			}
		} else if (field === "city") {
			this.state.orderInfo["street"] = "";
			this.props.orderInfo["street"] = "";
			this.state.orderInfo["warehouse"] = "";
			this.props.orderInfo["warehouse"] = "";
			const selectedCityRef = this.state.cities.filter((city) => city.DescriptionRu === value);
			if (selectedCityRef.length > 0) {
				this.state.selectedCityRef = selectedCityRef[0].Ref;
				if (this.state.selectedRegionRef === "") {
					const selectedRegionRef = this.state.regions.filter((region) => region.Ref === selectedCityRef[0].Area);
					if (selectedRegionRef.length > 0) {
						this.state.selectedRegionRef = selectedRegionRef[0].Ref;
						this.state.orderInfo["region"] = selectedRegionRef[0].Description;
						this.props.orderInfo["region"] = selectedRegionRef[0].Description;
					} else {
						this.state.selectedRegionRef = "";
					}
				} 
			} else {
				this.state.selectedCityRef = "";
			}

		}
		this.setState({});
	}

	render() {
		const that = this;
		const regions = this.state.regions.map((region) => {
			return <option key={region.Ref} value={region.Description}>{region.Description}</option>;
		});

		const cities = this.state.cities.map((city) => {
			if (that.state.selectedRegionRef !== "") {
				if (city.Area === that.state.selectedRegionRef) {
					return <option key={city.Ref} value={city.DescriptionRu}>{city.DescriptionRu}</option>;
				}
			} else {
				return <option key={city.Ref} value={city.DescriptionRu}>{city.DescriptionRu}</option>;
			};
		});

		let warehouses =
			<option value="" disabled selected>Выберите сначала Ваш населенный пункт</option>;
		if (that.state.selectedCityRef !== "") {
			warehouses = this.state.warehouses.map((warehouse) => {
				if (warehouse.CityRef === that.state.selectedCityRef) {
					return <option key={warehouse.Ref} value={warehouse.DescriptionRu}>{warehouse.DescriptionRu}</option>;
				}
			});
		} 

		let address = undefined;

		if (this.state.orderInfo.delivery !== "") {
			if (this.state.orderInfo.delivery === "Самовывоз") {
				address = <select placeholder="Выберите отделение Новой почты" className="cart-form-input" onChange={(e) => that.handleChange(e.target.value, "warehouse")} value={this.state.orderInfo.warehouse}>
					<option value="" disabled>Выберите отделение Новой почты</option>
					{warehouses}
				</select>;
			} else {
				address = <input placeholder="Введите улицу, дом/квартиру" className="cart-form-input" type="text" name="street" value={this.state.orderInfo.street} onChange={(e) => this.handleChange(e.target.value, "street")} />;
			}
		} else {
			address = <span />;
		}

		return <form id="order-form">
			<p className="order_header">Контактные данные</p>

			<div className="mt10 fs10">
				<p className="error-msg">Введите ваш E-mail</p>
				<input placeholder="Email" className="cart-form-input" type="email" name="email" id="Customer_email" maxLength="50" value={this.state.orderInfo.email} onChange={(e) => that.handleChange(e.target.value, "email")} />
			</div>

			<div className="mt15">
				<p className="error-msg">Введите Ваше имя</p>
				<input placeholder="Имя" className="cart-form-input" name="firstname" id="CustomerAddress_firstname" type="text" maxLength="50" value={this.state.orderInfo.firstName} onChange={(e) => that.handleChange(e.target.value, "firstName")} />
			</div>

			<div className="mt15">
				<p className="error-msg">Введите Вашу фамилию</p>
				<input placeholder="Фамилия" className="cart-form-input" name="lastname" id="CustomerAddress_lastname" type="text" maxLength="50" value={this.state.orderInfo.lastName} onChange={(e) => that.handleChange(e.target.value, "lastName")} />
			</div>

			<div className="mt15">
				<p className="error-msg">Введите Ваше отчество</p>
				<input placeholder="Отчество" className="cart-form-input" name="middlename" id="CustomerAddress_middlename" type="text" maxLength="50" value={this.state.orderInfo.middleName} onChange={(e) => that.handleChange(e.target.value, "middleName")} />
			</div>

			<div className="mt15">
				<p className="error-msg">Введите ваш номер телефона</p>
				<input placeholder="Телефон" className="cart-form-input" name="phone" id="CustomerAddress_phone" type="text" maxLength="17" value={this.state.orderInfo.phone} onChange={(e) => that.handleChange(e.target.value, "phone")} />
			</div>

			<div className="mt15" id="country_block">
				<input disabled="disabled" className="cart-form-input" type="text" value="Украина" name="country" id="country" />
			</div>

			<div className="mt15 fs12 region-container">
				<select name="regions" className="cart-form-input" value={this.state.orderInfo.region} onChange={(e) => that.handleChange(e.target.value, "region")} >
					<option value="" disabled>Выберите область</option>
					{regions}
				</select>
			</div>

			<div className="mt15 fs12 city-container">
				<select name="cities" className="cart-form-input" value={this.state.orderInfo.city} onChange={(e) => that.handleChange(e.target.value, "city")} >
					<option value="" disabled>Выберите населенный пункт</option>
					{cities}
				</select>
			</div>

			<div className="mt15 fs12" className="delivery-container" value={this.state.orderInfo.delivery}>
				<select value={this.state.orderInfo.delivery} className="cart-form-input" onChange={(e) => that.handleChange(e.target.value, "delivery")}>
					<option value="" disabled>Выберите способ доставки</option>
					<option value="Самовывоз">Самовывоз из отделения Новой почты</option>
					<option value="Курьер">Доставка курьером</option>
				</select>
			</div>

			<div className="mt15 fs12" className="address-container">
				{address}
			</div>

			<div className="mt15 fs12" className="payment-container">
				<select value={this.state.orderInfo.payment} className="cart-form-input" onChange={(e) => that.handleChange(e.target.value, "payment")}>
					<option value="" disabled>Выберите способ оплаты</option>
					<option value="Наличными">Наличными, при получении</option>
					<option value="Картой"> Банковской картой (инструкция в письме после оформления заказа)</option>
				</select>
			</div>

			<div className="mt15 fs12" className="comments-container">
				<textarea className="cart-form-input" placeholder="Дополнительные комментарии" value={this.state.orderInfo.comments} onChange={(e) => that.handleChange(e.target.value, "comments")}></textarea>
			</div>
		</form >;
	}
}

export default CartOrderForm;
