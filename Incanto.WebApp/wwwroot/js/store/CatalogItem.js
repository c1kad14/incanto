﻿import React from "react";

class CatalogItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.item === undefined) {
			return false;
		}
		const item = this.props.item;
		return (<li className="item" itemType="http://schema.org/Product" itemProp="itemListElement" itemScope="">
			<a onClick={() => { this.props.onItemSelected(this.props.item.id)}}>
				<img className="main-picture" src={item.photos[0].path} alt={item.name} itemProp="image" />
				       <div className="baseline-helper">
					       <div itemProp="name">
						       <p className="designer-info fs10 up ls2 bold">{item.brand.name}</p>
						       <p className="item-info fs10 up ls2">{item.name}</p>
					       </div>
					       <p className="item-price fs10 filter-item up ls2" itemType="http://schema.org/Offer" itemProp="offers" itemScope="">
						<span itemProp="price">{item.price}</span> грн
						       &nbsp;
						       <span>
							       {item.price} грн
						       </span>
					       </p>
				       </div>
			       </a>
		       </li>);
	}
}

export default CatalogItem;