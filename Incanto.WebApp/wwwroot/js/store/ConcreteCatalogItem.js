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
	navContainerWrapper: {
		width: "401px"
	},
	navContainer: {
		transitionDuration: "0ms",
		transform: "translate3d(0px, 0px, 0px)"
	},
	navContainerHiddenBlock: {
		transitionDuration: "0ms",
		transform: "translate3d(0px, 0px, 0px)",
		width: "76px",
		display: "none",
		height: "172px"
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
class ConcreteCatalogItem extends React.Component {
	constructor(props) {	
		super(props);
		this.state = {
			currentItem: undefined,
			currentItemSelectedPhoto: undefined,
			showOriginal: false
		}
		this.updateData = this.updateData.bind(this);
	}

	handleKeyDown(e) {
		switch (e.keyCode) {
			case 37:

				break;
			case 39:
				break;
			default:
				break;
		}
	}

	updateData(data) {
		let currentItem = {};
		if (data !== null || data !== undefined) {
			currentItem = data.model;
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
		this.setState({ showOriginal: false}, this.props.changeNavigationMenuValue(true));
	}

	otherItemPhotClick(e) {
		const selectedItemPath = e.target.attributes["path"].value;
		let selectedItem = this.state.currentItem.photos.filter((photo) => {
			return photo.path === selectedItemPath;
		});
		this.setState({ currentItemSelectedPhoto: selectedItem[0]});
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
					} onClick={otherItemPhotoClick}/>
			</div>;
		});
		return itemPhotos;
	}

	generateLeftPhotoBlock() {
		const allPhotos = this.prepareAllPhotosForItem();
		let mainPhotoClick = this.mainPhotoClick.bind(this);
		console.log(this.state.currentItemSelectedPhoto.path);
		return <div className="left">
			<div className="fotorama-slider-wrapper">
				<div className="fotorama fotorama1516232132390">
					<div className="fotorama__wrap fotorama__wrap--css3 fotorama__wrap--slide fotorama__wrap--toggle-arrows fotorama__wrap--no-controls" style={style.mainPhotoContainerWrapper}>
						<div className="fotorama__stage" style={style.mainPhotoContainer}>
							<div className="fotorama__stage__shaft fotorama__grab" style={style.mainPhotoChildContainer}>
								<div className="fotorama__stage__frame fotorama__loaded fotorama__loaded--img" style={style.mainPhotoImageWrapper}>
									<img src={this.state.currentItemSelectedPhoto.path} className="fotorama__img" style={style.mainPhotoImage} itemProp="image" alt={"Фото: " + this.state.currentItem.name + " " + this.state.currentItem.brand.name}
										title={this.state.currentItem.name + " " + this.state.currentItem.brand.name} onClick={mainPhotoClick}/>
								</div>
							</div>
						</div>
						<div className="fotorama__nav-wrap">
							<div className="fotorama__nav fotorama__nav--thumbs" style={style.navContainerWrapper}>
								<div className="fotorama__nav__shaft" style={style.navContainer}>
									<div className="fotorama__thumb-border" style={style.navContainerHiddenBlock}></div>
									<div className="fotorama__thumb fotorama__loaded fotorama__loaded--img">{allPhotos}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}

	generateRightInfoBlock() {
		return <div className="right fr">
			<h2 className="productBrand ls16">
				<a className="bold">
					<span itemProp="brand">{this.state.currentItem.brand.name}</span>
				</a>
			</h2>

			<div>
				<h1 className="prod-short-desc fs105 up ls16 prod-h1" itemProp="name">{this.state.currentItem.name}</h1>
				<p className="prod-code fs105 ls16">{this.state.currentItem.name}</p>
			</div>

			<div className="prod-category" style={style.displayNone}> {this.state.currentItem.category.name}</div>

			<div className="clear data-block" itemProp="offers" itemScope="" itemType="https://schema.org/Offer">
				<link itemProp="availability" href="https://schema.org/InStock" />
				<span className="fs11 ls2">
					<span itemProp="price" className="prod-price">{this.state.currentItem.price}</span>
					<span itemProp="priceCurrency" content="UAH">ГРН</span>
				</span>
				<span className="fs11 ls2">{this.state.currentItem.price} ГРН</span>
			</div>

			<div className="clear data-block sizes">
				<div className="bold fs10 ls16">РАЗМЕР:</div>
				<div className="size-table-show">(Таблица размеров)</div>
				<ul className="size-ul">
					<li className="chosen">{this.state.currentItem.name}</li>
				</ul>
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
				<p className="block-content">• Цвет: синий, белый, зеленый, желтый <br />
					• Состав: 100% хлопок; 100% полиэстер<br />
					• Застежка: пуговицы<br />
					• Два кармана<br />
					• Принт<br />
					• На модели (рост 176см) размер: 34<br />
				</p>
			</div>

			<div className="clear other-links">
				<div className="contact_us_init no-ajax fs10 ls16 bold up borderBottom" id="contact_us_init_question">Задать вопрос</div>
			</div>
		</div>;
	}

	getOriginalViewer() {
		const currentItem = this.state.currentItem;
		let photos = this.state.currentItem.photos.map((photo) => {
			console.log(photo.path);
			return <img key={photo.id} className="fotoramaList-image" src={photo.path} alt={ currentItem.name + " " + currentItem.brand.name } title={ currentItem.name + " " + currentItem.brand.name } />;
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

		return <div className="catalog fullw clear">
			{detailsBlock}
			{photoBlock}
		</div>;
	}
}

export default ConcreteCatalogItem;