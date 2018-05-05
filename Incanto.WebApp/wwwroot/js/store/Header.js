import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import $ from "jquery";

const styles = {
	logoText: {
		position: "absolute",
		marginLeft: "10px",
		marginTop: "5px",
		color: "white"
	},
	cartText: {
		display: "inline-block",
		color: "white"
	},
	logoMargin: {
		marginTop: "12px"
	},
	cartMargin: {
		display: "inline-block",
		maxWidth: "32px"
	}
};


class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	menuClick() {
		$("#left").css("display", "block");
	}
	filterClick() {
		$("#filters").css("display", "block");
		$("#item-description").css("display", "block");
		
	}
	componentDidMount() {
		$('body').click(function (evt) {
			if ($(evt.target).parents('#left').length === 0 && $(evt.target).parents('#filters').length === 0 && $(evt.target).parents('#item-description').length === 0 && $('#menu-button').css("display") !== "none") {
				$('#left').css("display", "none");
				$("#filters").css("display", "none");
				$("#item-description").css("display", "none");
			}
		});
	}
	
	render() {
		const props = this.props;
		let cartItems = props.cartItems.cartReducer;
		let cartItemsCount = 0;
		cartItems.map((item) => { cartItemsCount += item.count; });
		return (<div id="header-main">
			<div className="logo_image">
				<a id="menu-button" style={{ verticalAlign: "middle" }} onClick={this.menuClick}>
					<img style={styles.logoMargin} src="/menu.png"/>
			</a>
				<a style={{ verticalAlign: "middle" }} href="/">
					<img id="logo-image" style={styles.logoMargin} src="/Logo.png" />
					<span style={styles.logoText}>INCANTO</span>
				</a>
			</div>
			<div id="header">
				Бесплатная доставка по всей Украине
		       <p style={{ display: "block", position: "absolute", fontSize: "7pt", marginTop: "-31px", textAlign: "center", minWidth: "100%" }}>
					050-922-66-11 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 050-922-66-11
		       </p>
			</div>
			<div id="cart-header-container">
				<a id="filter-button" style={{ color: "white" }} onClick={this.filterClick}>
					<img src="/more.png" />
				</a>
				<Link to="/cart" style={styles.cartText}>
					<span id="cart-text">КОРЗИНА </span> <span id="cart-items-count-text">({cartItemsCount})</span>
					<img style={styles.cartMargin} src="/cart.png" />
				</Link>
			</div>
		</div>);
	}
}

function mapStateToProps(state) {
	return {
		cartItems:
		state
	};
}

export default connect(mapStateToProps)(Header);