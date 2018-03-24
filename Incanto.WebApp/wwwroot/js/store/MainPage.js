import React from "react";
import $ from "jquery";

const templateTypes = ["text", "fullwidth", "halfwidth"];

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}

	readExistingConfig() {
		const that = this;
		$.getJSON('incanto.json',
			function (data) {
				that.setState({ items: data });
			});
	}

	componentWillMount() {
		this.readExistingConfig();
	}

	render() {
		if (this.state.items.length === 0) {
			return false;
		}

		const list = this.state.items.map((item, index) => {
			if (item.type === templateTypes[0]) {
				return item.link !== undefined && item.link !== "" && item.link !== null ? <a key={item.type + index} href={item.link}><div className="main-page-text-block">{item.value}</div></a> : <div key={item.type + index}  className="main-page-text-block">{item.value}</div>;
			} else if (item.type === templateTypes[1]) {
				return item.link !== undefined && item.link !== "" && item.link !== null ? <a key={item.type + index} href={item.link}><img className="main-page-fullwidth-block" src={"MainPage/" + item.value} /></a> : <img key={item.type + index} className="main-page-fullwidth-block" src={"MainPage/" + item.value} />;
			} else if (item.type === templateTypes[2]) {
				const left = item.link !== undefined && item.link !== "" && item.link !== null
					? <a href={item.link}><img className="main-page-halfwidth-left-block" src={"MainPage/" + item.value} /></a>
					: <img className="main-page-halfwidth-left-block" src={"MainPage/" + item.value} />;
				const right = item.secondaryLink !== undefined && item.secondaryLink !== "" && item.secondaryLink !== null
					? <a href={item.secondaryLink}><img className="main-page-halfwidth-right-block" src={"MainPage/" + item.secondary} /></a>
					: <img className="main-page-halfwidth-right-block" src={"MainPage/" + item.secondary} />;
				return <div key={item.type + index} className="halfwidth-container"> 
							{left}
							{right}
					</div>;
			}
		});
		return <div id="main-page-container">
			{list}
			<br /><br /><br /><br /><br /><br />
		</div>;
	}
}

export default MainPage;