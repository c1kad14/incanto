import React from "react";
import ReactDom from "react-dom";
import DataService from "../app/Core/Services/DataService";
import CatalogItem from "./CatalogItem";
import RestApiCalls from "../app/Core/Services/RestApiCalls";
import $ from "jquery";

const controller = "catalogitems";

function comparePrices(a, b) {
	if (a.displayPrice < b.displayPrice)
		return -1;
	if (a.displayPrice > b.displayPrice)
		return 1;
	return 0;
}

class Catalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
		this.getQueryString = this.getQueryString.bind(this);
		this.updateData = this.updateData.bind(this);
	}

	sortAscending() {
		const items = this.state.items;
		let itemsToDisplay = items.sort(comparePrices);
		this.setState({ items: itemsToDisplay });
	}

	sortDescending() {
		const items = this.state.items;
		let itemsToDisplay = items.sort(comparePrices).reverse();
		this.setState({ items: itemsToDisplay });
	}

	updateData(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			return newData;
		}
	}

	getQueryString(props) {
		let result = "";
		result = props.brand != undefined ? result + `brand=${props.brand}` : result;
		result = props.gender != undefined ? result + `&gender=${props.gender}` : result;
		result = props.type != undefined ? result + `&type=${props.type}` : result;
		result = props.category != undefined ? result + `&category=${props.category}` : result;
		return result;
	}

	componentWillReceiveProps(nextProps) {
		const that = this;
		if (this.props.gender !== nextProps.gender ||
			this.props.type !== nextProps.type ||
			this.props.category !== nextProps.category ||
			this.props.brand !== nextProps.brand ||
			this.props.filterCategories.length !== nextProps.filterCategories.length ||
			this.props.filterBrands.length !== nextProps.filterBrands.length ||
			this.props.filterSizes.length !== nextProps.filterSizes.length) {
			let processData = this.updateData;
			if (nextProps.filterCategories.length > 0 ||
				nextProps.filterBrands.length > 0 ||
				nextProps.filterSizes.length > 0) {
				let formData = new FormData(this);
				let categories = nextProps.filterCategories.map((category) => category.id);
				let brands = nextProps.filterBrands.map((brand) => brand.id);
				let sizes = nextProps.filterSizes.map((size) => size.id);

				if (categories.length > 0) {
					categories.map((category) => formData.append("categories", category));
				} else {
					formData.set("gender", this.props.gender !== undefined ? this.props.gender : "");
				}
				brands.map((brand) => formData.append("brands", brand));
				sizes.map((size) => formData.append("sizes", size));
				const config = { headers: { 'content-type': 'multipart/form-data' } };
				const items = RestApiCalls.post(`/api/${controller}/GetFilteredList`, formData, config)
					.then((response) => processData(response.data));
				this.state.items = [];
				Promise.all([items]).then(function(values) {
					that.setState({ items: values[0] });
				});
			} else {
				this.state.items = [];
				const queryString = this.getQueryString(nextProps);
				const items = DataService.getItemsWithParameters(controller, queryString, processData);
				Promise.all([items]).then(function(values) {
					that.setState({ items: values[0] });
				});
			}
		}
	}

	componentWillMount() {
		this.props.sort.sortAsc = this.sortAscending.bind(this);
		this.props.sort.sortDesc = this.sortDescending.bind(this);
		let processData = this.updateData;
		const queryString = this.getQueryString(this.props);
		const items = DataService.getItemsWithParameters(controller, queryString, processData);
		const that = this;
		Promise.all([items]).then(function(values) {
			that.setState({ items: values[0] });
		});
	}

	//shouldComponentUpdate(nextProps, nextState) {
	//	if (this.props.gender !== nextProps.gender || this.props.type !== nextProps.type || this.props.category !== nextProps.category || this.props.brand !== nextProps.brand || this.state.items.length !== nextState.items.length || this.state.filterSettings.categories.length !== nextState.filterSettings.categories.length || this.state.filterSettings.brands.length !== nextState.filterSettings.brands.length || this.state.filterSettings.sizes.length !== nextState.filterSettings.sizes.length) {
	//		return true;
	//	}
	//	return false;
	//}

	componentWillUpdate() {
		const node = ReactDom.findDOMNode(this);
		if (node !== null) {
			$(node).stop(true, true).fadeOut('slow');
		}
	}

	componentDidUpdate() {
		const node = ReactDom.findDOMNode(this);
		if (node !== null) {
			$(node).stop(true, true).fadeIn('slow');
			node.scrollIntoView();
		}
	}

	render() {
		if (this.state.items === undefined || this.state.items.length === 0 || this.props.selectedItemId !== undefined) {
			return null;
		}

		const list = this.state.items.map(record => {
			return (<CatalogItem key={record.id} item={record} onItemSelected={this.props.onItemSelected} changeNavigationMenuValue={this.props.changeNavigationMenuValue}/>);
		});

		return (<div className="catalog fullw clear" itemScope itemType="http://schema.org/ItemList">
			<ul className="items" id="catalog-items">{list}</ul>
			</div>);
	}
}

export default Catalog;