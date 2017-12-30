import React from "react";
//import Lightbox from 'react-images';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionDeleteForever from "material-ui/svg-icons/action/delete-forever"
import DesignService from "../Services/DesignService";

class ImagesGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: 3
		}
	}

	selectImage(id) {
		if (this.props.selectImage !== undefined) {
			this.props.selectImage(id);
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
		DesignService.onChangedToSmall(this.setSmall);
		DesignService.onChangedToMedium(this.setMedium);
		DesignService.onChangedToLarge(this.setLarge);
	}

	render() {
		const likeImage = this.likeImage;
		const deleteImage = this.deleteImage;
		const canRemoveImage = this.props.removeImage !== undefined;
		const selectImage = this.selectImage;
		return (
			<div style={{ display: 'flex', flexWrap: 'wrap', margin: "0", justifyContent: 'space-around' }}>
				<GridList
					cols={this.state.cols}
					cellHeight={180}
					style={{ overflowY: 'auto' }}>
					{this.props.imageSource.map(function (image) {
						const actionButton = canRemoveImage ?
							<IconButton><ActionDeleteForever color="white" onClick={function () { deleteImage(image) }} /></IconButton> :
							<IconButton><StarBorder color="white" onClick={function () { likeImage(image) }} /></IconButton>;
						return <GridTile
							titlePosition="top"
							titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							key={image.id}
							title={image.title}
							subtitle={<span>{image.author === "" ? "" : "Автор :"} <b>{image.author}</b></span>}
							actionIcon={actionButton}>
							<img src={image.src} onClick={function () { selectImage(image.id); }} />
						</GridTile>;
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