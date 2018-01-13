﻿import React from "react";
import IncantoToolbar from "./Core/Controls/IncantoToolbar";
import RecordsList from "./Core/RecordsList";


class IncantoRecords extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			controller: "countries",
			shouldRefreshTable: false
		}
	}
	selectedTableChangedHandler(controller) {
		this.setState({ controller: controller, shouldRefreshTable: false }, function () { console.log("updated controller:" + controller) });
	}

	refreshDataTable() {
		this.setState({ shouldRefreshTable: true });
	}

	render() {
		const columns = {
			"countries": ["id", "name"],
			"brands": ["id", "name", "country.name"],
			"types": ["id", "name", "gender.name"],
			"categories": ["id", "name", "type.name", "type-gender.name"],
			"detailtypes": ["id", "name", "category.name", "category-type.name", "category-type-gender.name"],
			"detailtypevalues": ["id", "value", "detailType.name", "detailType-category.name" , "detailType-category-type.name", "detailType-category-type-gender.name"],
			"items": ["id", "name", "brand.name", "category.name", "category-type.name", "category-type-gender.name", "description", "discount.value"]
		};

		const lookupFields = {
			"brands": [
				{ "country": { "controller": "countries" } }
			],
			"types": [
				{ "gender": { "controller": "genders" } }
			],
			"categories": [
				{ "type": { "controller": "types"} }
			],
			"detailtypes": [
				{ "category": { "controller": "categories"} }
			],
			"detailtypevalues": [
				{ "detailType": { "controller": "detailtypes" } }
			],
			"items": [
				{ "brand": { "controller": "brands" } },
				{ "category": { "controller": "categories" } },
				{ "discount": { "controller": "discounts" } }
			]
		};
		return (
			<div>
				<IncantoToolbar columns={columns[this.state.controller]} controller={this.state.controller} selectedTableChangedHandler={this.selectedTableChangedHandler.bind(this)} lookupFields={lookupFields[this.state.controller]} updateDataTable={this.refreshDataTable.bind(this)} />
				<RecordsList columns={columns[this.state.controller]} controller={this.state.controller} shouldRefreshTable={this.state.shouldRefreshTable} />
			</div>

		);
	}
}

module.exports = IncantoRecords;