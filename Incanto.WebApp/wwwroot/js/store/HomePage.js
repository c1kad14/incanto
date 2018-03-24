import React from "react";
import ReactDom from "react-dom";
import DataService from "../app/Core/Services/DataService";
import NavigationMenu from "./NavigationMenu";
import MainPage from "./MainPage";
import Catalog from "./Catalog";
import Brands from "./Brands";
import Contacts from "./Contacts";
import Help from "./Help";
import ConcreteCatalogItem from "./ConcreteCatalogItem";
import Footer from "./Footer";
import Filter from "./Filter";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			types: [],
			categories: [],
			selectedGender: undefined,
			selectedType: undefined,
			selectedCategory: undefined,
			selectedBrand: undefined,
			selectedItemId: undefined,
			navigateTo: undefined,
			showNavigationMenu: true,
			filterSettings: {
				categories: [],
				brands: [],
				sizes: []
			},
			sort: {},
			fetch: {}
		}

		this.loadTypes = this.loadTypes.bind(this);
		this.loadCategories = this.loadCategories.bind(this);
		this.updateFilters = this.updateFilters.bind(this);
	}

	brandSelected(brand) {
		let filter = this.state.filterSettings;
		filter.brands = [];
		filter.brands.push(brand);
		this.setState({
			selectedBrand: brand.name,
			filterSettings: filter,
			navigateTo: undefined
		});
	}

	getGender(gender) {
		let result = undefined;
		switch (gender) {
		case "women":
			result = "Женщинам";
			break;
		case "men":
			result = "Мужчинам";
			break;
		case "kids":
			result = "Детям";
			break;
		}
		return result;
	}

	componentDidUpdate() {
		const node = ReactDom.findDOMNode(this);
		if (node !== null) {
			node.scrollIntoView();
		}
	}

	updateFilters(gender, type, category, brand, item, navigateTo
	) {
		if (this.state.selectedType !== type ||
			this.state.selectedCategory !== category ||
			this.state.selectedGender !== gender ||
			this.state.selectedBrand !== brand ||
			this.state.selectedItemId !== item ||
			this.state.navigateTo !== navigateTo) {
				this.setState({
					selectedGender: gender,
					selectedType: type,
					selectedCategory: category,
					selectedBrand: brand,
					selectedItemId: item,
					navigateTo: navigateTo,
					filterSettings: {
						categories: [],
						brands: [],
						sizes: []
					}
				});
		}
	}

	updateSelectedItem(itemId) {
		this.setState({ selectedItemId: itemId });
	}

	changeNavigationMenuValue(value) {
		if (this.state.showNavigationMenu !== value) {
			this.setState({ showNavigationMenu: value });
		}
	}

	loadTypes(data) {
		let newTypes = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newTypes.push(data[i].model);
			}
		}
		return newTypes;
	}

	sort(method) {
		if (method === "asc") {
			this.state.sort.sortAsc();
		} else if (method === "desc") {
			this.state.sort.sortDesc();
		}
	}

	loadCategories(data) {
		const newCategories = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newCategories.push(data[i].model);
			}
		}
		return newCategories;
	}

	loadItem(data) {
		let currentItem = undefined;
		if (data !== undefined) {
			currentItem = data.model;
		}
		return currentItem;
	}

	componentWillMount() {
		let callbackTypes = this.loadTypes;
		let callbackCategories = this.loadCategories;
		let loadItem = this.loadItem;
		const that = this;
		let types = DataService.getItems("types", callbackTypes);
		let categories = DataService.getItems("categories", callbackCategories);
		let itemModel = undefined;
		if (this.props.match.params.itemId !== undefined) {
			itemModel = DataService.getObject("items", this.props.match.params.itemId, loadItem);
		}
		Promise.all([types, categories, itemModel]).then(function (values) {
			let gender = undefined;
			let type = undefined;
			let category = undefined;
			let item = undefined;
			let navigate = undefined;

			if (that.props.match.params.itemId !== undefined) {
				item = that.props.match.params.itemId;
				let model = values[2];
				if (model !== undefined) {
					gender = model.category.type.gender.name;
					type = model.category.type.name;
					category = model.category.name;
				}
			} else {
				if (that.props.match.params.gender !== undefined) {
					gender = that.getGender(that.props.match.params.gender);
				}

				if (that.props.match.params.typeId !== undefined) {
					type = values[0].filter((type) => type.id === parseInt(that.props.match.params.typeId))[0].name;
				}

				if (that.props.match.params.categoryId !== undefined) {
					category = values[1].filter((category) => category.id === parseInt(that.props.match.params.categoryId))[0].name;
				}

				switch (that.props.match.url) {
					case "/":
						navigate = "main";
						break;
					case "/sale":
						navigate = "sale";
						break;
					case "/brands":
						navigate = "brands";
						break;
					case "/contacts":
						navigate = "contacts";
						break;
					case "/help":
						navigate = "help";
						break;
					case "/new":
						navigate = "new";
						break;
				}
			}

			that.setState({ types: values[0], categories: values[1], selectedGender: gender, selectedType: type, selectedCategory: category, selectedItemId: item, navigateTo: navigate });
		});
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			if (nextProps.match.params.itemId !== undefined) {
				const that = this;
				let loadItem = this.loadItem;
				let itemModel = DataService.getObject("items", nextProps.match.params.itemId, loadItem);

				Promise.all([itemModel]).then(function(values) {
					let gender = undefined;
					let type = undefined;
					let category = undefined;
					let item = that.props.match.params.itemId;

					let model = values[0];
					if (model !== undefined) {
						gender = model.category.type.gender.name;
						type = model.category.type.name;
						category = model.category.name;
					}

					that.setState({
						selectedGender: gender,
						selectedType: type,
						selectedCategory: category,
						selectedItemId: item });
				});
			} else {
				let gender = undefined;
				let type = undefined;
				let category = undefined;
				let item = undefined;

				if (nextProps.match.params.gender !== undefined) {
					gender = this.getGender(nextProps.match.params.gender);
					this.state.selectedBrand = gender !== undefined ? undefined : this.state.selectedBrand;
				}

				if (nextProps.match.params.typeId !== undefined) {
					type = this.state.types.filter((type) => type.id === parseInt(nextProps.match.params.typeId))[0].name;
				}

				if (nextProps.match.params.categoryId !== undefined) {
					category = this.state.categories.filter((category) => category.id === parseInt(nextProps.match.params.categoryId))[0].name;
				}

				let navigate = undefined;
				if (nextProps.match.url === "/brands") {
					if (((this.state.filterSettings.brands.length === 0 && this.state.filterSettings.categories.length === 0 && this.state.filterSettings.sizes.length === 0) || (this.state.selectedGender !== undefined))) {
						navigate = "brands";
					}
				} else if (nextProps.match.url === "/new") {
					navigate = "new";
				}
				else if (nextProps.match.url === "/") {
					navigate = "main";
				} else if (nextProps.match.url === "/sale") {
					navigate = "sale";
				}
				else if (nextProps.match.url === "/contacts") {
					navigate = "contacts";
				} else if (nextProps.match.url === "/help") {
					navigate = "help";
				}

				if (this.state.selectedGender !== gender || this.state.selectedType !== type || this.state.selectedCategory !== category || this.state.selectedItemId !== nextProps.match.params.itemId || this.state.navigateTo !== navigate) {
					this.setState({
						navigateTo: navigate,
						selectedGender: gender,
						selectedType: type,
						selectedCategory: category,
						selectedBrand: undefined,
						selectedItemId: item,
						filterSettings: this.state.selectedBrand === undefined || this.props.navigateTo !== navigate ? {
							categories: [],
							brands: [],
							sizes: []
						} : this.state.filterSettings
					});
				}
			}
		} 
	}

	render() {
		if (this.state.types.length === 0 || this.state.categories.length === 0) {
			return false;
		}
		const catalog = this.state.selectedItemId === undefined
			? <Catalog gender={this.state.selectedGender}
				type={this.state.selectedType}
				category={this.state.selectedCategory}
				brand={this.state.selectedBrand}
				selectedItemId={this.state.selectedItemId}
				navigateTo={this.state.navigateTo}
				onItemSelected={this.updateSelectedItem.bind(this)} sort={this.state.sort} filterCategories={this.state.filterSettings.categories} filterBrands={this.state.filterSettings.brands} filterSizes={this.state.filterSettings.sizes}
				fetch={this.state.fetch}
			/>
			: <ConcreteCatalogItem selectedItemId={this.state.selectedItemId} changeNavigationMenuValue={this.changeNavigationMenuValue.bind(this)} />;
		const brands = <Brands brandSelected={this.brandSelected.bind(this)} />;
		const main = <MainPage />;
		const contacts = <Contacts />;
		const help = <Help />;
		let display = catalog;
		switch (this.state.navigateTo) {
			case "main":
				display = main;
				break;
			case "brands":
				display = brands;
				break;
			case "contacts":
				display = contacts;
				break;
			case "help":
				display = help;
				break;
		}
		return <div id="scrollable-id" className="product-content">
			{this.state.showNavigationMenu ? <div id="left">
				<NavigationMenu updateFilters={this.updateFilters} types={this.state.types}
					categories={this.state.categories}
					selectedGender={this.state.selectedGender}
					selectedType={this.state.selectedType}
					selectedCategory={this.state.selectedCategory}
					selectedBrand={this.state.selectedBrand}
					selectedItemId={this.state.selectedItemId}
					navigateTo={this.state.navigateTo}
				/>
			</div> :
				<span></span>
			}
			{display}
			{this.state.selectedItemId === undefined && (this.state.navigateTo === undefined || this.state.navigateTo === "sale" || this.state.navigateTo === "new") && this.state.showNavigationMenu 
				? <Filter gender={this.state.selectedGender} type={this.state.selectedType} category={this.state.selectedCategory} filterSettings={this.state.filterSettings} sort={this.sort.bind(this)}/> : <span></span>}
			{this.state.showNavigationMenu ? <Footer /> : <span></span>}
		</div>;
	}
}

export default HomePage;