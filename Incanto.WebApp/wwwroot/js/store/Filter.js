import React from "react";
import DataService from "../app/Core/Services/DataService";
import $ from "jquery";

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSection: undefined,
			selectedCategories: [],
			selectedBrands: [],
			selectedSizes: [],
			categories: [],
			brands: [],
			sizes: []
		};
		this.loadData = this.loadData.bind(this);
	}

	loadData(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
		}
		return newData;
	}

	prepareFilterItems() {
		let callbackLoadData = this.loadData;
		const that = this;
		let categories = DataService.getItems("categories", callbackLoadData);
		let brands = DataService.getItems("brands", callbackLoadData);
		let sizes = DataService.getItems("sizes", callbackLoadData);
		Promise.all([categories, brands, sizes]).then(function(values) {
			let returnCategories = values[0];
			let returnedBrands = values[1];
			let returnedSizes = values[2];

			if (that.props.type !== undefined) {
				returnCategories = returnCategories.filter((category) => category.type.name === that.props.type && category.type.gender.name === that.props.gender);
				returnedSizes = returnedSizes.filter((size) => size.category.type.name === that.props.type && size.category.type.gender.name === that.props.gender);

			} else if (that.props.gender !== undefined) {
				returnCategories = returnCategories.filter((category) => category.type.gender.name === that.props.gender);
				returnedSizes = returnedSizes.filter((size) => size.category.type.gender.name === that.props.gender);
			}

			if (that.props.category !== undefined) {
				returnCategories = [];
			}
			
			that.setState({ categories: returnCategories, brands: returnedBrands, sizes: returnedSizes }, () => {
				if (that.props.filterSettings.brands.length > 0) {
					that.addBrandToFilterClick(that.props.filterSettings.brands[0]);
				}
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.category !== nextProps.category || this.props.type !== nextProps.type || this.props.gender !== nextProps.gender || this.props.filterSettings.brands.length !== nextProps.filterSettings.brands.length || this.props.filterSettings.categories.length !== nextProps.filterSettings.categories.length || this.props.filterSettings.sizes.length !== nextProps.filterSettings.sizes.length) {
			this.removeAllFilterItems();
		}
	}

	closeFilters() {
		$("#filters").css("display", "none");
	}

	componentWillMount() {
		this.prepareFilterItems();
	}

	filterSectionClick(name) {
		if (this.state.selectedSection === name) {
			name = undefined;
		}
		this.setState({ selectedSection: name });
	}

	getCategoriesSection() {
		const filterSectionClick = this.filterSectionClick.bind(this);
		const addCategoryToFilterClick = this.addCategoryToFilterClick.bind(this);
		const categories = this.state.categories.map((category) => {
			return <p key={"filter-category-id: " + category.id} className="glf fs11">
				<a className="filter-add" onClick={() => addCategoryToFilterClick(category)}>{category.name}</a>
		</p>;
		});
		return this.state.categories !== undefined && this.state.categories.length > 0 ?
			<div className="locky clear mt12" >
				<div className="unlock clear">
					<p className="filter-title fs10" onClick={() => filterSectionClick("category")}>Категория</p>
				</div>
				<div id="1_filter_items" className={this.state.selectedSection === "category" ? "mt10 open" : "mt10 close"}>
					{categories}
			</div>
			</div > 
				: <span></span>;
	}

	getBrandsSection() {
		const filterSectionClick = this.filterSectionClick.bind(this);
		const addBrandToFilterClick = this.addBrandToFilterClick.bind(this);
		const brands = this.state.brands.map((brand) => {
			return <p key={"filter-brand-id: " + brand.id} className="glf fs11">
				<a className="filter-add" onClick={() => addBrandToFilterClick(brand)}>{brand.name}</a>
			</p>;
		});
		return this.state.brands !== undefined ?
			<div className="locky clear mt12" >
				<div className="unlock clear">
					<p className="filter-title fs10" onClick={() => filterSectionClick("brand")}>Бренд</p>
				</div>
				<div id="2_filter_items" className={this.state.selectedSection === "brand" ? "mt10 open" : "mt10 close"}>
					{brands}
				</div>
			</div >
			: <span></span>;
	}

	getSizesSection() {
		const filterSectionClick = this.filterSectionClick.bind(this);
		const addSizeToFilterClick = this.addSizeToFilterClick.bind(this);
		const sizes = this.state.sizes.map((size) => {
			return <p key={"filter-size-id: " + size.id} className="glf fs11">
				<a className="filter-add" onClick={() => addSizeToFilterClick(size)}>{size.name}</a>
			</p>;
		});
		return this.state.sizes !== undefined ?
			<div className="locky clear mt12">
				<div className="unlock clear">
					<p className="filter-title fs10" onClick={() => filterSectionClick("size")}>Размер</p>
				</div>
				<div id="3_filter_items" className={this.state.selectedSection === "size" ? "mt10 open" : "mt10 close"}>
					{sizes}
				</div>
			</div>
			: <span></span>;
	}

	addCategoryToFilterClick(category) {
		let selectedCategories = this.state.selectedCategories.map((selectedCategory) => selectedCategory);
		let existing = this.state.categories.map((category) => category);
		existing.splice(existing.indexOf(category), 1);
		selectedCategories.push(category);
		this.setState({ selectedCategories: selectedCategories, categories: existing }, this.props.updateFilterSettings("categories",selectedCategories));
	}

	addBrandToFilterClick(brand) {
		let selectedBrands = this.state.selectedBrands.map((selectedBrand) => selectedBrand);
		let existing = this.state.brands.filter((br) => br.id !== brand.id);
		selectedBrands.push(brand);
		this.setState({ selectedBrands: selectedBrands, brands: existing }, this.props.updateFilterSettings("brands", selectedBrands));
	}

	addSizeToFilterClick(size) {
		let selectedSizes = this.state.selectedSizes.map((selectedSize) => selectedSize);
		let existing = this.state.sizes.map((size) => size);
		existing.splice(existing.indexOf(size), 1);
		selectedSizes.push(size);
		this.setState({ selectedSizes: selectedSizes, sizes: existing }, this.props.updateFilterSettings("sizes", selectedSizes));
	}

	removeCategoryFromFilterClick(category) {
		let selectedCategories = this.state.selectedCategories.map((selectedCategory) => selectedCategory);
		let categories = this.state.categories.map((category) => category);
		categories.push(category);
		this.state.categories = categories;
		if (selectedCategories.length === 1) {
			this.setState({ selectedCategories: [] }, this.props.updateFilterSettings("categories", []));
		} else {
			selectedCategories.splice(selectedCategories.indexOf(category), 1);
			this.setState({ selectedCategories: selectedCategories }, this.props.updateFilterSettings("categories", selectedCategories));
		}
	}

	removeBrandFromFilterClick(brand) {
		let selectedBrands = this.state.selectedBrands.map((selectedBrand) => selectedBrand);
		let brands = this.state.brands.map((brand) => brand);
		brands.push(brand);
		this.state.brands = brands;
		if (selectedBrands.length === 1) {
			this.setState({ selectedBrands: [] }, this.props.updateFilterSettings("brands", []));
		} else {
			selectedBrands.splice(selectedBrands.indexOf(brand), 1);
			this.setState({ selectedBrands: selectedBrands }, this.props.updateFilterSettings("brands", selectedBrands));
		}
	}

	removeSizeFromFilterClick(size) {
		let selectedSizes = this.state.selectedSizes.map((selectedSize) => selectedSize);
		let sizes = this.state.sizes.map((size) => size);
		sizes.push(size);
		this.state.sizes = sizes;
		if (selectedSizes.length === 1) {
			this.setState({ selectedSizes: [] }, this.props.updateFilterSettings("categories", []));
		} else {
			selectedSizes.splice(selectedSizes.indexOf(size), 1);
			this.setState({ selectedSizes: selectedSizes }, this.props.updateFilterSettings("categories", selectedCategories));
		}
	}

	removeAllFilterItems() {
		this.setState({ selectedCategories: [], selectedBrands: [], selectedSizes: [], selectedSection: undefined }, this.props.clearFilterSettings());
		this.prepareFilterItems();
	}

	getSelectedFilterItemsSection() {
		const removeCategoryFromFilterClick = this.removeCategoryFromFilterClick.bind(this);
		const removeBrandFromFilterClick = this.removeBrandFromFilterClick.bind(this);
		const removeSizeFromFilterClick = this.removeSizeFromFilterClick.bind(this);
		const removeAllFilterItems = this.removeAllFilterItems.bind(this);
		let filterCategoryItems = this.state.selectedCategories.map((category) => {
			return <div key={"selected-category-id: " + category.id} className="clear">
				<span className="filter-item glf fs11">
					<a className="filter-remove" onClick={() => removeCategoryFromFilterClick(category)}>{category.name}&nbsp;(x)</a>
				</span>
			</div>;
		});

		let filterBrandItems = this.state.selectedBrands.map((brand) => {
			return <div key={"selected-brand-id: " + brand.id} className="clear">
				<span className="filter-item glf fs11">
					<a className="filter-remove" onClick={() => removeBrandFromFilterClick(brand)}>{brand.name}&nbsp;(x)</a>
				</span>
			</div>;
		});

		let filterSizeItems = this.state.selectedSizes.map((size) => {
			return <div key={"selected-size-id: " + size.id} className="clear">
				<span className="filter-item glf fs11">
					<a className="filter-remove" onClick={() => removeSizeFromFilterClick(size)}>{size.name}&nbsp;(x)</a>
				</span>
			</div>;
		});

		return <div className="selfil clear" id="filter_info">
			<span className="filter-header">ВЫ ИСКАЛИ:</span>
			<div id="clear-filter" style={{ display: "block" }}><button className="glf" onClick={removeAllFilterItems}>(Очистить
				       все)</button></div>
			{filterCategoryItems}
			{filterBrandItems}
			{filterSizeItems}
		</div>;
	}
 
	render() {
		const categorySection = this.getCategoriesSection();
		const brandsSection = this.getBrandsSection();
		const sizesSection = this.getSizesSection();
		const selectedFilterItems = this.getSelectedFilterItemsSection();
		const that = this;
		return <div id="filters" className="right">
			<button className="close close-mobile-button" onClick={this.closeFilters.bind(this)}></button>
			<div className="filters">
				{this.state.selectedCategories.length > 0 || this.state.selectedBrands.length > 0 || this.state.selectedSizes.length > 0 ? selectedFilterItems : <div className="filter-header2  fs12">ФИЛЬТР</div> }
				<div className="sort_head mt20 fs9">
					<span className="sort_header">ЦЕНА:</span>
					<div className="sort_link first"><a onClick={() => { that.props.sort("asc") }}>НИЗКАЯ</a></div>
					<div className="sort_link"><a onClick={() => { that.props.sort("desc") }}>ВЫСОКАЯ</a></div>
					<br />
				</div>
				<div id="filter-body" className="mt20">
					{categorySection}
					{brandsSection}
					{sizesSection}
				</div>
			</div>
		</div>;
	}
}

export default Filter;