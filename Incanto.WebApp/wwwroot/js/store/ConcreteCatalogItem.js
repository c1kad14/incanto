import React from "react";
import DataService from "../app/Core/Services/DataService";
import ReactDom from "react-dom";

const controller = "items";
const style = {
	displayNone: {
		display: "none"
	},
	mainPhotoContainerWrapper: {
		width: "80%",
		minWidth: "400px",
		maxWidth: "400px"
	},
	mainPhotoContainer: {
		width: "401px",
		marginTop: "50px",
		marginBottom: "50px"
	},
	mainPhotoChildContainer: {
		transitionDuration: "0ms",
		transform: "translate3d(0.001px, 0px, 0px)",
		width: "401px",
		marginLeft: "0px"
	},
	mainPhotoImageWrapper: {
		left: "0px"
	},
	mainPhotoImage: {
		width: "401px"
	},
	otherPhotosContainer: {
		width: "78px",
		display: "inline"
	},
	otherPhotos: {
		width: "78px"
	},
	extraContainer: {
		display: "block"
	},
	extraContainerNanoContent: {
		right: "-16px"
	},
	extraContainerNanoSlider: {
		transform: "translate(0px, 0px)"
	}
}
function compareImages(a, b) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0;
}

class ConcreteCatalogItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentItem: undefined,
			currentItemSelectedPhoto: undefined,
			showOriginal: false
		}
		this.updateData = this.updateData.bind(this);
		this.previousPhoto = this.previousPhoto.bind(this);
		this.nextPhoto = this.nextPhoto.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(e) {
		switch (e.keyCode) {
			case 37:
				this.previousPhoto();
				break;
			case 39:
				this.nextPhoto();
				break;
			default:
				break;
		}
	}

	updateData(data) {
		let currentItem = {};
		if (data !== null || data !== undefined) {
			currentItem = data.model;
			let photos = currentItem.photos.sort(compareImages);
			currentItem.photos = photos;

			this.setState({ currentItem: currentItem, currentItemSelectedPhoto: currentItem.photos[0] },
				() => {
					console.log('updated state value', this.state.currentItem);
				});
		}
	}

	componentWillReceiveProps(nextProps) {
		let processData = this.updateData;
		DataService.getObject(controller, nextProps.selectedItemId, processData);
	}

	componentWillMount() {
		let processData = this.updateData;
		DataService.getObject(controller, this.props.selectedItemId, processData);
		document.addEventListener("keydown", this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
	}

	componentDidUpdate() {
		const node = ReactDom.findDOMNode(this);
		node !== null ? node.scrollIntoView() : true;
	}

	mainPhotoClick() {
		this.setState({ showOriginal: true }, this.props.changeNavigationMenuValue(false));
	}

	closeOriginalViewer() {
		this.setState({ showOriginal: false }, this.props.changeNavigationMenuValue(true));
	}

	otherItemPhotClick(e) {
		const selectedItemPath = e.target.attributes["path"].value;
		let selectedItem = this.state.currentItem.photos.filter((photo) => {
			return photo.path === selectedItemPath;
		});
		this.setState({ currentItemSelectedPhoto: selectedItem[0] });
	}

	nextPhoto() {
		const selectedPhoto = this.state.currentItemSelectedPhoto;
		let selectedItem = undefined;
		for (let i = 0; i < this.state.currentItem.photos.length; i++) {
			if (this.state.currentItem.photos[i] === selectedPhoto) {
				if (this.state.currentItem.photos[i + 1] !== undefined) {
					selectedItem = this.state.currentItem.photos[i + 1];
				}
				break;
			}
		}
		if (selectedItem !== undefined) {
			this.setState({ currentItemSelectedPhoto: selectedItem });
		}
	}

	previousPhoto() {
		const selectedPhoto = this.state.currentItemSelectedPhoto;
		let selectedItem = undefined;
		for (let i = 0; i < this.state.currentItem.photos.length; i++) {
			if (this.state.currentItem.photos[i] === selectedPhoto) {
				if (this.state.currentItem.photos[i - 1] !== undefined) {
					selectedItem = this.state.currentItem.photos[i - 1];
				}
				break;
			}
		}
		if (selectedItem !== undefined) {
			this.setState({ currentItemSelectedPhoto: selectedItem });
		}
	}

	prepareAllPhotosForItem() {
		let otherItemPhotoClick = this.otherItemPhotClick.bind(this);
		const itemPhotos = this.state.currentItem.photos.map(photo => {
			return <div key={photo.id} className={photo.path === this.state.currentItemSelectedPhoto.path
				? "fotorama__nav__frame fotorama__nav__frame--thumb fotorama__active"
				: "fotorama__nav__frame fotorama__nav__frame--thumb"} style={style.otherPhotosContainer}>

				<img src={photo.path} path={photo.path} className="fotorama__img" style={style.otherPhotos} alt={this.state.currentItem.name +
					" " +
					this.state.currentItem.brand.name} title={this.state.currentItem.name + " " + this.state.currentItem.brand.name
					} onClick={otherItemPhotoClick} />
			</div>;
		});
		return itemPhotos;
	}

	generateLeftPhotoBlock() {
		const allPhotos = this.prepareAllPhotosForItem();
		let mainPhotoClick = this.mainPhotoClick.bind(this);

		return <div className="center">
			<div className="fotorama-slider-wrapper">
				<div id="back-image" onClick={this.previousPhoto}></div>
				<div id="fotorama">
					<div style={style.mainPhotoContainerWrapper}>
						<div className="fotorama__stage" style={style.mainPhotoContainer}>
							<div style={style.mainPhotoChildContainer}>
								<div className="fotorama__stage__frame" style={style.mainPhotoImageWrapper}>
									<img src={this.state.currentItemSelectedPhoto !== undefined ? this.state.currentItemSelectedPhoto.path : ""} className="fotorama__img" style={style.mainPhotoImage} itemProp="image" alt={"Фото: " +
										this.state.currentItem.name +
										" " +
										this.state.currentItem.brand.name}
										title={this.state.currentItem.name + " " + this.state.currentItem.brand.name} onClick={mainPhotoClick} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="forward-image" onClick={this.nextPhoto}></div>
			</div>
			<div className="fotorama-nav-wrap">
				<div className="fotorama-nav">
					<div className="navigation-photos">{allPhotos}</div>
				</div>
			</div>
		</div>;
	}

	generateRightInfoBlock() {
		let handledDetailTypesIds = [];
		let details = [];
		let sizes = [];
		let sizeOtherInfo = undefined;
		const curItem = this.state.currentItem;
		this.state.currentItem.details.forEach((detail) => {
			const curDetailTypeId = detail.detailValue.detailType.id;
			if (handledDetailTypesIds.filter((hdtid) => hdtid === curDetailTypeId).length === 0) {
				let curDetailTypeIdDetails = curItem.details.filter((detail) => {
					return detail.detailValue.detailType.id === curDetailTypeId;
				});
				let detailValue = "";
				for (let i = 0; i < curDetailTypeIdDetails.length; i++) {
					if (i + 1 !== curDetailTypeIdDetails.length) {
						detailValue = detailValue.concat(curDetailTypeIdDetails[i].detailValue.value + ", ");
					} else {
						detailValue = detailValue.concat(curDetailTypeIdDetails[i].detailValue.value);
					}
				}
				details.push(
					<li key={curDetailTypeId}>{curDetailTypeIdDetails[0].detailValue.detailType.name + ": " + detailValue}
					</li>);
				handledDetailTypesIds.push(curDetailTypeId);
			}
		});
		if (this.state.currentItem.existingItems !== undefined && this.state.currentItem.existingItems !== null && this.state.currentItem.existingItems.length > 0) {
			const that = this;
			this.state.currentItem.existingItems.map((existingItem) => {
				sizes.push(<li key={existingItem.id} className={that.state.selectedSizeId === existingItem.size.id ? "chosen" : ""} onClick={() => { that.setState({ selectedSizeId: existingItem.size.id }) }}>{existingItem.size.name} </li>
				);
			});
			const selectedSizeId = this.state.selectedSizeId;
			const otherInfo = this.state.currentItem.existingItems.filter((existingItem) => {
				return selectedSizeId === existingItem.size.id
			});
			sizeOtherInfo = selectedSizeId !== undefined
				? otherInfo[0].size.other
				: undefined;
		}


		return <div className="right fr">
			<h2 className="productBrand ls16">
				<h3 className="bold">
					<span itemProp="brand">{this.state.currentItem.brand.name}</span>
				</h3>
			</h2>

			<div>
				<h1 className="prod-short-desc fs105 up ls16 prod-h1" itemProp="name">{this.state.currentItem.name}</h1>
				<p className="prod-code fs105 ls16">{this.state.currentItem.identifier}</p>
			</div>

			<div className="prod-category" style={style.displayNone}> {this.state.currentItem.category.name}</div>

			<div className="clear data-block" itemProp="offers" itemScope="" itemType="https://schema.org/Offer">
				<link itemProp="availability" href="https://schema.org/InStock" />
				{<span className="fs11 ls2">{this.state.currentItem.displayPrice} ГРН </span>}
				<span className="fs11 ls2">
					{this.state.currentItem.oldPrice !== 0 ? <span itemProp="price" className="old-price">{this.state.currentItem.oldPrice} ГРН</span> : <span></span>}
				</span>
			</div>

			<div className="clear data-block sizes">
				<div className="bold fs10 ls16">РАЗМЕР:</div>
				<div className="size-table-show">(Таблица размеров)</div>
				<ul className="size-ul">
					{sizes}
				</ul>
				<div>{sizeOtherInfo}</div>
			</div>

			<div className="clear mt10">
				<button id="add-to-cart" className="s-buy fs10 up ls2">
					Добавить в корзину
				</button>
				<button id="buy-one-click" className="up ls2 fs10 one-click-button">
					Купить в один клик
				</button>
				<br />
			</div>

			<div className="product_card_details">
				<div className="detail_button fs10 up bold  ls16">
					Детали
					</div>
			</div>

			<div className="clear data-block details grf fs11">
				<ul className="block-content">
					{details}
				</ul>
			</div>

			{this.state.currentItem.description !== undefined && this.state.currentItem.description !== "" && this.state.currentItem.description !== null ? <div>
				<div className="product_card_details">
					<div className="detail_button fs10 up bold  ls16">
						Описание
					</div>
				</div>

				<div className="clear data-block details grf fs11">
					<div className="block-content">{this.state.currentItem.description}</div>
				</div>
				<br/>
			</div> : <span></span>
			}



			<div className="clear other-links">
				<div className="contact_us_init no-ajax fs10 ls16 bold up borderBottom" id="contact_us_init_question">Задать вопрос</div>
			</div>
		</div>;
	}

	getOriginalViewer() {
		const currentItem = this.state.currentItem;
		let photos = this.state.currentItem.photos.map((photo) => {
			console.log(photo.path);
			return <img key={photo.id} className="fotoramaList-image" src={photo.path} alt={currentItem.name + " " + currentItem.brand.name} title={currentItem.name + " " + currentItem.brand.name} />;
		});

		return <div id="extra" className="top-indent nano has-scrollbar" style={style.extraContainer}>
			<button className="close" onClick={this.closeOriginalViewer.bind(this)}></button>
			<div className="nano-content content" tabIndex="0" style={style.extraContainerNanoContent}>
				<div className="wrapper-popup">
					{photos}
				</div>
			</div>
		</div>;
	}


	render() {
		if (this.state.currentItem === undefined) {
			return false;
		}
		if (this.state.showOriginal) {
			const originalViewer = this.getOriginalViewer();
			return originalViewer;
		}
		const photoBlock = this.generateLeftPhotoBlock();
		const detailsBlock = this.generateRightInfoBlock();

		return <div>
			<div className="catalog">
				{photoBlock}
			</div>
			{detailsBlock}
		</div>;
	}
}

export default ConcreteCatalogItem;