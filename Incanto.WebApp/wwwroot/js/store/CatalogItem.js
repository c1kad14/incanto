import React from "react";

function compareImages(a, b) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0;
}

class CatalogItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.item === undefined) {
			return false;
		}
		const item = this.props.item;
		let imageToDisplay = item.photos.sort(compareImages);
		return (<li className="item" itemType="http://schema.org/Product" itemProp="itemListElement" itemScope="">
			<a onClick={() => { this.props.onItemSelected(this.props.item.id)}}>
				<img className="main-picture" src={imageToDisplay[0].path} alt={item.name} itemProp="image" />
				       <div className="baseline-helper">
					       <div itemProp="name">
						       <p className="designer-info fs10 up ls2 bold">{item.brand.name}</p>
						       <p className="item-info fs10 up ls2">{item.name}</p>
					       </div>
					       <p className="item-price fs10 filter-item up ls2" itemType="http://schema.org/Offer" itemProp="offers" itemScope="">
						{item.newPrice !== 0 ? <span className="old-price" itemProp="price">{item.price} грн</span> : <span itemProp="price">{item.price} грн</span>}
						       &nbsp;
						       {item.newPrice !== 0 ? <span>
														{item.newPrice} грн
						                              </span> : <span></span>}
					       </p>
				       </div>
			       </a>
		       </li>);
	}
}

export default CatalogItem;