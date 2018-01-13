import React from "react";
//import Lightbox from 'react-images';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionDeleteForever from "material-ui/svg-icons/action/delete-forever";
import NavigateBefore from "material-ui/svg-icons/image/navigate-before";
import NavigateNext from "material-ui/svg-icons/image/navigate-next";
import DesignService from "../Services/DesignService";
import CardActions from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class ImagesGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: 5
		}
		DesignService._init();
	}

	increasePriority(image) {
		let source = this.props.imageSource;
		for (let i = 0; i < source.length; i++) {
			if (source[i].priority === image.priority && source[i - 1] !== undefined) {
				const p1 = source[i].priority;
				const p2 = source[i - 1].priority;
				const tmp = source[i];
				source[i] = source[i - 1];
				source[i - 1] = tmp;
				source[i].priority = p1;
				source[i - 1].priority = p2;
				break;
			}
		}
		this.setState({});
	}

	decreasePriority(image) {
		let source = this.props.imageSource;
		for (let i = 0; i < source.length; i++) {
			if (source[i].priority === image.priority && source[i + 1] !== undefined) {
				const p1 = source[i].priority;
				const p2 = source[i + 1].priority;
				const tmp = source[i];
				source[i] = source[i + 1];
				source[i + 1] = tmp;
				source[i].priority = p1;
				source[i + 1].priority = p2;
				//we need break because elements are already swapped and on the next iteration selected element will be swapped again till to the end
				break;
			}
		}
		this.setState({});
	}

	selectImage(priority) {
		if (this.props.selectImage !== undefined) {
			this.props.selectImage(priority);
		}
	}

	deleteImage(image) {
		if (this.props.removeImage !== undefined) {
			this.props.removeImage(image);
		}
	}

	setLarge() {
		this.setState({ cols: this.props.imageSource.length < 3 ? this.props.imageSource.length : 3 });
	}

	setMedium () {
		this.setState({ cols: this.props.imageSource.length < 2 ? this.props.imageSource.length : 2 });
	}

	setSmall() {
		this.setState({ cols: 1 });
	}

	componentWillMount () {
		DesignService.onChangedToSmall(this.setSmall.bind(this));
		DesignService.onChangedToMedium(this.setMedium.bind(this));
		DesignService.onChangedToLarge(this.setLarge.bind(this));
	}


	render() {
		const styles = {
			root: {
				display: 'flex',
				flexWrap: 'wrap',
				margin: "0",
				justifyContent: 'space-around'
			},
			gridList: {
				width: 1100,
				height: 450
			},
			gridTile: {
				height: 175,
				width: 200
			}
		};

		const deleteImage = this.deleteImage.bind(this);
		const selectImage = this.selectImage.bind(this);
		const increasePriority = this.increasePriority.bind(this);
		const decreasePriority = this.decreasePriority.bind(this);
		return (
			<div style={styles.root} key="grid-list-container">
				<GridList
					cols={this.state.cols}
					key="grid-list"
					style={styles.gridList}>
					{this.props.imageSource.map(function (image) {
						const actionButton = <IconButton><ActionDeleteForever color="white" onClick={() => { deleteImage(image) }} /></IconButton>;
						return <div style={styles.gridTile} key={"grid-tile-container" + image.priority}><GridTile
							titlePosition="bottom"
							titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							key={image.prioroty}
							title={image.file.name}
							subtitle={<span>{image.priority === "" ? "" : "Priority:"} <b>{image.priority}</b></span>}
							actionIcon={actionButton}>
							<img src={image.src} onClick={function () { selectImage(image.priority); }} />
						</GridTile>
						<CardActions>
								<FlatButton style={{ width: '50%' }} onClick={() => increasePriority(image)}><NavigateBefore color="white" style={{ marginTop: '7px' }}/></FlatButton>
								<FlatButton style={{ width: '50%' }} onClick={() => decreasePriority(image)}><NavigateNext color="white" style={{ marginTop: '7px' }}/></FlatButton>
						</CardActions>
						</div>;
					})}
				</GridList>
			</div>
		);
	}

	componentWillUnmount () {
		window.onresize = undefined;
	}
}

export default ImagesGrid;