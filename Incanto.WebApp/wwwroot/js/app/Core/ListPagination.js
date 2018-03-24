import React from "react";
import FlatButton from "material-ui/FlatButton";

const style = {
	minWidth: "50px"
};

class PaginationItems extends React.Component {
	//displayName: "PaginationItems",
	//propTypes: {
	//	availablePages: PropTypes.number.isRequired,
	//	selectPage: PropTypes.func.isRequired
	//},
	constructor(props) {
		super(props);
		this.state = {
			startIndex: 1,
			activePage: 1
		};
	}

	increaseIndex() {
		if (this.state.startIndex + this.props.displayPagesCount - 1 < this.props.availablePages) {
			this.setState({ startIndex: this.state.startIndex + 1 });
		}
	}

	decreaseIndex() {
		if (this.state.startIndex > 1) {
			this.setState({ startIndex: this.state.startIndex - 1 });
		}
	}

	selectPage(page) {
		if (this.state.startIndex + this.props.displayPagesCount - 1 === page.index) {
			this.increaseIndex();
		}
		if (this.state.startIndex === page.index) {
			this.decreaseIndex();
		}
	
	    let pageindex = page.index;
		this.setState({ activePage: page.index }, () => console.log("changed to: " + pageindex));
		this.props.selectPage(page.index);
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.displayPagesCount < nextState.activePage ||
			(nextState.startIndex + this.props.displayPagesCount - 1) > nextProps.availablePages) {
			this.state.activePage = 1;
			this.state.startIndex = 1;
		} else if (this.state.activePage !== nextProps.activePage) {
			this.state.activePage = nextProps.activePage;
		}
	}

	render() {
		const list = [];
		if (this.props.availablePages > this.props.displayPagesCount) {
			list.push(<FlatButton
				key={this.state.startIndex - 1}
				label="<" style={style}
				onClick={() => this.decreaseIndex()} />);
		}
		const lastIndex = this.state.startIndex + this.props.displayPagesCount - 1;
		for (let index = this.state.startIndex; index <= lastIndex; index++) {
			list.push(<FlatButton
				key={index}
				primary={this.state.activePage === index}
				label={index} style={style}
				onClick={() => this.selectPage({ index })} />);
		}
		if (this.props.availablePages > this.props.displayPagesCount) {
			list.push(<FlatButton
				key={lastIndex + 2}
				label=">" style={style}
				onClick={() => this.increaseIndex()} />);
		}
		return <div>
			{list}
		</div>;

	}
}

class ListPagination extends React.Component {
	//displayName: "ListPagination",
	//propTypes: {
	//	availablePages: PropTypes.number.isRequired
	//},
	constructor(props) {
		super(props);
	}

	render() {
		const displayPages = this.props.availablePages > 5 ? 5 : this.props.availablePages;
		const paginationItems = this.props.availablePages > 1 ?
			<PaginationItems
				displayPagesCount={displayPages}
				availablePages={this.props.availablePages}
				selectPage={this.props.selectPage}
				activePage={this.props.activePage}/> : <div></div>;
		return <div>
			{paginationItems}
		</div>;
	}
}

module.exports = ListPagination;