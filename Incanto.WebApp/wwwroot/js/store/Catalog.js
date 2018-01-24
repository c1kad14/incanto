import React from "react";
import ReactDom from "react-dom";
import DataService from "../app/Core/Services/DataService";
import CatalogItem from "./CatalogItem";
import $ from "jquery";

const controller = "catalogitems";

class Catalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
		this.getQueryString = this.getQueryString.bind(this);
		this.updateData = this.updateData.bind(this);
	}

	updateData(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
			this.setState({ items: newData },
				() => {
					console.log('updated state value', this.state.items);
				});
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
		let processData = this.updateData;
		const queryString = this.getQueryString(nextProps);
		DataService.getItemsWithParameters(controller, queryString, processData);
	}

	componentWillMount() {
		let processData = this.updateData;
		const queryString = this.getQueryString(this.props);
		DataService.getItemsWithParameters(controller, queryString, processData);
	}

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
		if (this.state.items.length === 0) {
			return false;
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