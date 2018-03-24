import React from "react";
import { Link } from "react-router-dom";

class NavigationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.getGenderTypes = this.getGenderTypes.bind(this);
		this.getTypeCategories = this.getTypeCategories.bind(this);
		this.getGenderStyle = this.getGenderStyle.bind(this);
		this.getBrandsStyle = this.getBrandsStyle.bind(this);
	}

	getGender(gender) {
		let result = undefined;
		switch (gender) {
			case "Женщинам":
			result = "women";
			break;
		case "Мужчинам":
			result = "men";
			break;
		case "Детям":
			result = "kids";
			break;
		}
		return result;
	}

	getTypeCategories(type) {
		let navigateFunc = this.navigateCategory;
		const gender = this.getGender(type.gender.name);
		let getStyle = this.getCategoryStyle.bind(this);
		if (this.props.selectedType === type.name) {
			let typeCategories = this.props.categories.map(function(category) {
				if (category.type.id === type.id) {
					return <li key={category.name} className="level3_i">
						<Link to={`/${gender}/type/${type.id}/category/${category.id}`} style={getStyle(category.name)} >{category.name}</Link>
					</li>;
				}
			});
			return typeCategories;
		}
	}

	getGenderTypes(genderName) {
		let typeCategoriesFunc = this.getTypeCategories;
		let navigateFunc = this.navigateType;
		let getStyle = this.getTypeStyle.bind(this);
		const gender = this.getGender(genderName);
		if (this.props.selectedGender === genderName) {
			let genderTypes = this.props.types.map(function(type) {
				if (type.gender.name === genderName) {
					return <li key={type.name} className="level2_i">
						<Link to={`/${gender}/type/${type.id}`} style={getStyle(type.name)} >{type.name}</Link>
						<ul className="level3_m" >
							{typeCategoriesFunc(type)}
						</ul>
					</li>;
				}
			});
			return genderTypes;
		};
	}

	getBrandsStyle() {
		return {
			borderBottom: this.props.navigateTo === "brands" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.navigateTo === "brands" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""

		}
	}

	getGenderStyle(gender) {
		return {
			borderBottom: this.props.selectedGender === gender && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.selectedGender === gender && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""
		
		}
	}

	getTypeStyle(type) {
		return {
			borderBottom: this.props.selectedType === type && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.selectedType === type && this.props.selectedCategory === undefined ? "-1px" : ""
		}
	}

	getCategoryStyle(category) {
		return {
			borderBottom: this.props.selectedCategory === category ? "1px solid" : "",
			marginBottom: this.props.selectedCategory === category ?  "-1px" : ""
		}
	}

	getNewStyle() {
		return {
			fontWeight: "bold",
			borderBottom: this.props.navigateTo === "new" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.navigateTo === "new" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""

		}
	}

	getSaleStyle() {
		return {
			color: "red",
			borderBottom: this.props.navigateTo === "sale" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.navigateTo === "sale" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""

		}
	}

	getHelpStyle() {
		return {
			borderBottom: this.props.navigateTo === "help" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.navigateTo === "help" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""

		}
	}

	getContactsStyle() {
		return {
			borderBottom: this.props.navigateTo === "contacts" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "1px solid" : "",
			marginBottom: this.props.navigateTo === "contacts" && this.props.selectedGender === undefined && this.props.selectedType === undefined && this.props.selectedCategory === undefined ? "-1px" : ""

		}
	}

	shouldComponentUpdate(nextProps, nextSate) {
		if (this.props.selectedGender === nextProps.selectedGender && this.props.selectedType === nextProps.selectedType && this.props.selectedCategory === nextProps.selectedCategory && this.props.selectedBrand === nextProps.selectedBrand && this.props.navigateTo === nextProps.navigateTo) {
			return false;
		}
		return true;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedGender !== nextProps.selectedGender || this.props.selectedType !== nextProps.selectedType ||  this.props.selectedCategory !== nextProps.selectedCategory || this.props.selectedBrand !== nextProps.selectedBrand || this.props.selectedItemId !== nextProps.selectedItemId || this.props.navigateTo !== nextProps.navigateTo) {
			this.props.updateFilters(nextProps.selectedGender, nextProps.selectedType, nextProps.selectedCategory, nextProps.selectedBrand, nextProps.selectedItemId, nextProps.navigateTo);
		}
	}

	render() {
		if (this.props.types.length === 0 || this.props.categories.length === 0) {
			return null;
		}
		const womenSection =
			<ul className="level2_m" >
				{this.getGenderTypes("Женщинам")}
				</ul>;
		const menSection =
			<ul className="level2_m" >
				{this.getGenderTypes("Мужчинам")}
				</ul>;
		const childSection =
			<ul className="level2_m" >
				{this.getGenderTypes("Детям")}
				</ul>;

		return <div key="navigation-menu-container" className="menu_wrapper fs11">
			<ul key="navigation-menu-list" className="level1_m">
				<li key="navigation-menu-list-new-container" className="level1_i">
					<Link style={this.getNewStyle()} to={"/new"}>Новые поступления</Link>
				</li>
				<li key="navigation-menu-list-women-container" className="level1_i">
					<Link style={this.getGenderStyle("Женщинам")} to={"/women"}>Женщинам</Link>
					{womenSection}
				</li>
				<li key="navigation-menu-list-men-container" className="level1_i">
					<Link style={this.getGenderStyle("Мужчинам")} to={"/men"}>Мужчинам</Link>
					{menSection}
				</li>
				<li key="navigation-menu-list-kids-container" className="level1_i">
					<Link style={this.getGenderStyle("Детям")} to={"/kids"}> Детям</Link>
					{childSection}
				</li>
				<li key="navigation-menu-list-sale-container" className="level1_i">
					<Link style={this.getSaleStyle()}   to={"/sale"}> SALE %</Link>
				</li>
				<li key="navigation-menu-list-brand-container" className="level1_i">
					<Link style={this.getBrandsStyle()} to={"/brands"}>Бренды</Link>
				</li>
				<li key="navigation-menu-list-contact-container" className="level1_i">
					<Link style={this.getContactsStyle()} to={"/contacts"}>Контакты</Link>
				</li>
				<li key="navigation-menu-list-help-container" className="level1_i">
					<Link style={this.getHelpStyle()} to={"/help"}>Помощь</Link>
				</li>
			</ul>
		</div>;
	}
}

export default NavigationMenu;