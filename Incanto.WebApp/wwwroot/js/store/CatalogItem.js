import React from "react";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-image-loading";

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
		imageToDisplay = imageToDisplay !== undefined && imageToDisplay.length > 0 ? imageToDisplay[0].path : undefined;
		let separateIndex = imageToDisplay.lastIndexOf("\\");
		separateIndex = separateIndex + 1;
		let imagePreview = imageToDisplay.substring(0, separateIndex) + "thumb_" + imageToDisplay.substring(separateIndex);
		return (<li className="item" itemType="http://schema.org/Product" itemProp="itemListElement" itemScope="">
			<Link to={`/item/${this.props.item.id}`}>
				<ProgressiveImage
					preview={imagePreview}
					src={imageToDisplay}
					render={(src) => <img className="main-picture" alt={item.name} src={src} itemProp="image" />}
				/>
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
			       </Link>
		       </li>);
	}
}

export default CatalogItem;