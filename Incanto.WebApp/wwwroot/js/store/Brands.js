import React from "react";
import DataService from "../app/Core/Services/DataService";

class Brands extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brands: [],
			selectedBrand: undefined
		}
		this.selectedBrandChanged = this.selectedBrandChanged.bind(this);
	}

	selectedBrandChanged(brand) {
		this.props.brandSelected(brand);
	}

	updateData(data) {
		const newData = [];
		if (data !== null || data !== undefined) {
			for (let i = 0; i < data.length; i++) {
				newData.push(data[i].model);
			}
		}
		return newData;
	}

	componentWillMount() {
		const processData = this.updateData;
		const that = this;
		const brands = DataService.getItems("brands", processData);
		Promise.all([brands]).then(function (values) {
			that.setState({ brands: values[0] });
		});
	}

	render() {
		if (this.state.brands === undefined || this.state.brands.length === 0) {
			return false;
		}
		const list = this.state.brands;
		const selectedBrandChanged = this.selectedBrandChanged;
	
		return <div className="designers-list">
			<p className="designers_header">Бренды</p>
			<div className="designers-flex-container">
				<div className="fl item-group">
					<div className="item">
						<p className="item_header">A</p>
						{list.filter((brand) => brand.name.startsWith("A")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">B</p>
						{list.filter((brand) => brand.name.startsWith("B")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">C</p>
						{list.filter((brand) => brand.name.startsWith("C")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">D</p>
						{list.filter((brand) => brand.name.startsWith("D")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">E</p>
						{list.filter((brand) => brand.name.startsWith("E")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">F</p>
						{list.filter((brand) => brand.name.startsWith("F")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">G</p>
						{list.filter((brand) => brand.name.startsWith("G")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">H</p>
						{list.filter((brand) => brand.name.startsWith("H")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">I</p>
						{list.filter((brand) => brand.name.startsWith("I")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
				</div>
				<div className="fl item-group">
					<div className="item">
						<p className="item_header">J</p>
						{list.filter((brand) => brand.name.startsWith("J")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">K</p>
						{list.filter((brand) => brand.name.startsWith("K")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">L</p>
						{list.filter((brand) => brand.name.startsWith("L")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">M</p>
						{list.filter((brand) => brand.name.startsWith("M")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">N</p>
						{list.filter((brand) => brand.name.startsWith("N")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">O</p>
						{list.filter((brand) => brand.name.startsWith("O")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">P</p>
						{list.filter((brand) => brand.name.startsWith("P")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">Q</p>
						{list.filter((brand) => brand.name.startsWith("Q")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">R</p>
						{list.filter((brand) => brand.name.startsWith("R")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
				</div>
				<div className="fl item-group">
					<div className="item">
						<p className="item_header">S</p>
						{list.filter((brand) => brand.name.startsWith("S")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">T</p>
						{list.filter((brand) => brand.name.startsWith("T")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">U</p>
						{list.filter((brand) => brand.name.startsWith("U")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">V</p>
						{list.filter((brand) => brand.name.startsWith("V")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">W</p>
						{list.filter((brand) => brand.name.startsWith("W")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">X</p>
						{list.filter((brand) => brand.name.startsWith("X")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">Y</p>
						{list.filter((brand) => brand.name.startsWith("Y")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
					<div className="item">
						<p className="item_header">Z</p>
						{list.filter((brand) => brand.name.startsWith("Z")).map((brand) => {
							return <a key={brand.id} onClick={() => selectedBrandChanged(brand)}>{brand.name}</a>;
						})}
					</div>
				</div>
				</div>
			</div>;
	}
}

export default Brands;