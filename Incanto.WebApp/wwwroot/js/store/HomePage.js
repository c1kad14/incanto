import React from "react";
import NavigationMenu from "./NavigationMenu";
import Catalog from "./Catalog";
import ConcreteCatalogItem from "./ConcreteCatalogItem";
import Footer from "./Footer";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedGender: "Женщинам",
			selectedType: undefined,
			selectedCategory: undefined,
			selectedBrand: undefined,
			selectedItemId: undefined,
			showNavigationMenu: true
		}
		this.updateFilters = this.updateFilters.bind(this);
	}

	updateFilters(gender, type, category, brand) {
		this.setState({ selectedGender: gender, selectedType: type, selectedCategory: category, selectedBrand: brand, selectedItemId: undefined });
	}

	updateSelectedItem(itemId) {
		this.setState({ selectedItemId: itemId });
	}

	changeNavigationMenuValue(value) {
		if (this.state.showNavigationMenu !== value) {
			this.setState({ showNavigationMenu: value });
		}
	}

	render() {
		const logoFontMain = { fontWeight: "bold" };
		const logoFont = { fontSize: "14.5pt", verticalAlign: "top" };
		let catalog = this.state.selectedItemId === undefined
			? <Catalog gender={this.state.selectedGender} type={this.state.selectedType} category={this.state.selectedCategory
			} brand={this.state.selectedBrand} onItemSelected={this.updateSelectedItem.bind(this)} />
			: <ConcreteCatalogItem selectedItemId={this.state.selectedItemId} changeNavigationMenuValue={this.changeNavigationMenuValue.bind(this)} />;
		return <div className="product-content">
			{this.state.showNavigationMenu ? <div id="left">
				<div className="logo_image"><a href="" ><span style={logoFontMain}>INCANTO &nbsp;</span> <span style={logoFont}>ITALIAN CLOTHES</span></a>
				</div>
				<NavigationMenu updateFilters={this.updateFilters}
					selectedGender={this.state.selectedGender}
					selectedType={this.state.selectedType}
					selectedCategory={this.state.selectedCategory}
					selectedBrand={this.state.selectedBrand} />
			</div> :
				<span></span>
			}
			{catalog}
			{this.state.showNavigationMenu ? <Footer /> : <span></span>}
		</div>;
	}
}

export default HomePage;