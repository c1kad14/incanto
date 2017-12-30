﻿import React from "react";
import DataService from "../app/Core/Services/DataService";

class NavigationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			types: [],
			categories: [],
			selectedGender: "Женщинам",
			selectedType: "default",
			selectedCategory: "default"
		}
		this.loadTypes = this.loadTypes.bind(this);
		this.loadCategories = this.loadCategories.bind(this);
		this.getGenderTypes = this.getGenderTypes.bind(this);
		this.getTypeCategories = this.getTypeCategories.bind(this);
		this.navigateType = this.navigateType.bind(this);
		this.navigateCategory = this.navigateCategory.bind(this);
		this.navigateGender = this.navigateGender.bind(this);
		this.getGenderStyle = this.getGenderStyle.bind(this);
	}

	navigateGender(gender) {
		this.setState({ selectedGender: gender.target.text, selectedType: "default", selectedCategory: "default" });
		console.log(gender.target.text);
	}

	navigateType(type) {
		this.setState({ selectedType: type.target.text, selectedCategory: "default" });
		console.log(type.target.text);
	}

	navigateCategory(category) {
		this.setState({ selectedCategory: category.target.text });
		console.log(category.target.text);
	}

	componentWillMount() {
		let callbackTypes = this.loadTypes;
		let callbackCategories = this.loadCategories;
		DataService.getItems("types", callbackTypes);
		DataService.getItems("categories", callbackCategories);
	}

	loadTypes(data) {
		let newTypes = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newTypes.push(data[i].model);
			}
			this.setState({ types: newTypes },
				() => {
					console.log('updated types value', this.state.types);
				});
		}
	}

	loadCategories(data) {
		const newCategories = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newCategories.push(data[i].model);
			}
			this.setState({ categories: newCategories },
				() => {
					console.log('updated state value', this.state.categories);
				});
		}
	}

	getTypeCategories(type) {
		let navigateFunc = this.navigateCategory;
		let getStyle = this.getCategoryStyle.bind(this);
		if (this.state.selectedType === type.name) {
			let typeCategories = this.state.categories.map(function(category) {
				if (category.type.id === type.id) {
					return <li className="level3_i">
						<a href={"#" + category.name} style={getStyle(category.name)} className="level3_l " onClick={navigateFunc}>{category.name}</a>
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
		if (this.state.selectedGender === genderName) {
			let genderTypes = this.state.types.map(function(type) {
				if (type.gender.name === genderName) {
					return <li className="level2_i">
						<a href={"#" + type.name} style={getStyle(type.name)} className="level2_l" onClick={navigateFunc}>{type.name}</a>
						<ul className="level3_m" >
							{typeCategoriesFunc(type)}
						</ul>
					</li>;
				}
			});
			return genderTypes;
		};
	}

	getGenderStyle(gender) {
		return {
			borderBottom: this.state.selectedGender === gender && this.state.selectedType === "default" && this.state.selectedCategory === "default" ? "1px solid" : ""
		
		}
	}

	getTypeStyle(type) {
		return {
			borderBottom: this.state.selectedType === type && this.state.selectedCategory === "default" ? "1px solid" : ""
		}
	}

	getCategoryStyle(category) {
		return {
			borderBottom: this.state.selectedCategory === category ? "1px solid" : ""
		}
	}

	render() {
		const style = {
		}
		if (this.state.types.length === 0 || this.state.categories.length === 0) {
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

		return <div className="menu_wrapper fs11">
			<ul className="level1_m">
				<li className="level1_i">
					<a href="#" className="level1_l ">Бренды</a>
				</li>
				<li className="level1_i">
					<a href="#" style={this.getGenderStyle("Женщинам")} className="level1_l" onClick={this.navigateGender}>Женщинам</a>
					{womenSection}
				</li>
				<li className="level1_i">
					<a href="#" style={this.getGenderStyle("Мужчинам")} className="level1_l" onClick={this.navigateGender}>Мужчинам</a>
					{menSection}
				</li>

				<li className="level1_i">
					<a href="#" style={this.getGenderStyle("Детям")} className="level1_l" onClick={this.navigateGender}>Детям</a>
					{childSection}
				</li>
			</ul>
		</div>;
	}
}

export default NavigationMenu