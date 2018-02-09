import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ImagesGrid from "./ImagesGrid";
import RestApiCalls from "../Services/RestApiCalls";
import DataService from "../Services/DataService";
import RaisedButton from 'material-ui/RaisedButton';

function compareImages(a, b) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0;
}

class ImageUploader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: "",
			imagePreviewUrl: "",
			imageSource: [],
			imagesToRemove: [],
			imageViewOpened: false,
			imageUploadOpened: false,
			currentImg: {},
			lastId: 0,
			selectedItem: this.props.selectedItem
		};
		this.imageChange.bind(this);
	}


	imageChange (e) {
		e.preventDefault();
		let reader = new FileReader();
		if (e.target.files.length > 0) {
			let file = e.target.files[0];
			reader.onloadend = () => {
				this.setState({ currentImg: { src: reader.result, file: file }, imageViewOpened: true });
			}
			reader.readAsDataURL(file);
		}
	}

	handleCloseImageView () {
		this.clearDataAboutPhoto();
	}

	handleCloseImageUpload () {
		this.setState({imageUploadOpened: false, imageSource: [], imagesToRemove: [], lastId: 0 }, this.props.refreshDataTable);
	}

	handleCloseDialog() {
		this.setState({ galleryOpened: false, addPhotoOpened: false });
	}

	handleSaveImage () {
		var hasErrors = false;
		if (!hasErrors) {
			const imageSource = this.state.imageSource;
			imageSource.push({
				priority: this.state.lastId,
				src: this.state.currentImg.src,
				file: this.state.currentImg.file,
				itemId: this.state.selectedItem.id,
				type: this.state.currentImg.type
			});
			this.state.imageSource = imageSource;
			this.state.lastId = this.state.lastId + 1;
			this.clearDataAboutPhoto();
		}
	}

	clearDataAboutPhoto () {
		this.fileInput.value = "";
		this.setState({ imageViewOpened: false, currentImg: {} });
	}

	removeImage (image) {
		const imageSource = this.state.imageSource;
		for (let i = 0; i < imageSource.length; i++) {
			if (imageSource[i].priority === image.priority) {
				imageSource.splice(i, 1);
			}
		}
		if (image.id !== undefined) {
			let imagesToRemove = this.state.imagesToRemove;
			imagesToRemove.push(image);
			this.setState({ imagesToRemove: imagesToRemove });
		}

		this.setState({ imageSource: imageSource });
	}

	uploadImages () {
		const itemId = this.state.selectedItem.id;
		let formData = new FormData(this);
		let recordsToUpdate = [];
		for (let i = 0; i < this.state.imageSource.length; i++) {
			if (this.state.imageSource[i].file !== undefined) {
				formData.append("files", this.state.imageSource[i].file);
				formData.append("priorities", this.state.imageSource[i].priority);
			} else {
				recordsToUpdate.push(this.state.imageSource[i]);
			}
		}
		formData.set("itemId", itemId);
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		const handleCloseImageUpload = this.handleCloseImageUpload.bind(this);
		if (this.state.imagesToRemove.length > 0) {
			this.state.imagesToRemove.map((image) => {
				DataService.deleteObject(this.props.uploadController, image);
			});
		}

		if (recordsToUpdate.length > 0) {
			recordsToUpdate.map((image) => {
				const imageToUpdate = {
					id: image.id,
					priority: image.priority,
					path: image.src
				};
				DataService.updateObject(this.props.uploadController, imageToUpdate);
			});
		}
		RestApiCalls.post(`/api/${this.props.uploadController}/UploadPhotos`, formData, config).then(function (response) {
			handleCloseImageUpload();
		});
	}

	openFileInput () {
		this.fileInput.click();
	}

	openImageUploadDialog (selectedItem) {
		this.setState({ imageUploadOpened: true, selectedItem: selectedItem });
	}

	processExistingImages(props) {
		let itemPhotos = props.selectedItem.photos;
		let imageSource = [];
		if (itemPhotos !== undefined && itemPhotos.length > 0) {
			itemPhotos.sort(compareImages);
			this.state.lastId = itemPhotos[itemPhotos.length - 1].priority + 1;
			itemPhotos.map((photo) => {
				imageSource.push({
					priority: photo.priority,
					src: photo.path,
					file: undefined,
					itemId: props.selectedItem.id,
					id: photo.id
				});
			});
		}

		this.setState({ imageSource: imageSource, imageViewOpened: false, currentImg: {} });
	} 

	componentWillReceiveProps(nextProps) {
		this.processExistingImages(nextProps);
	}

	componentWillMount() {
		this.props.uploaderActions.openDialog = this.openImageUploadDialog.bind(this);
		this.processExistingImages(this.props);
	}

	render () {
		let { imageSource } = this.state;
		let imagePreview = null;
		if (imageSource.length > 0) {
			imagePreview = (
				<ImagesGrid
					removeImage={this.removeImage.bind(this)}
					imageSource={this.state.imageSource} />
			);
		}
		else {
			imagePreview = (<p style={{ height: '450px'}}>Фото отсутствуют. Выберите фото что бы добавить.</p>);
		}
		const imageViewActions = [
			<FlatButton
				label={"Сохранить"}
				primary={true}
				onClick={this.handleSaveImage.bind(this)} />,
			<FlatButton
				label={"Отмена"}
				secondary={true}
				onClick={this.handleCloseImageView.bind(this)} />
		];
		const imageUploadActions = [
			<RaisedButton
				label={"Выберите фото"}
				primary={true}
				onClick={this.openFileInput.bind(this)} />,
			<RaisedButton
				label={"Закрыть"}
				secondary={true}
				onClick={this.handleCloseImageUpload.bind(this)} />

		];
		if (this.state.imageSource.length > 0) {
			imageUploadActions.push(
				<FlatButton
					label={"upload"}
					primary={true}
					onClick={this.uploadImages.bind(this)} />);
		}
		return (
			<div>
				<Dialog
					actions={imageUploadActions}
					contentStyle={{ width: "90%", maxWidth: '90%' }}
					title={ "Добавить фото к товару с id: " + this.state.selectedItem.id }
					modal={false}
					open={this.state.imageUploadOpened}
					onRequestClose={this.handleCloseImageUpload.bind(this)}
					autoScrollBodyContent={true}>
					<form>
						<input
							ref={(input) => { this.fileInput = input; }}
							style={{ visibility: "hidden" }}
							type="file"
							onChange={(e) => this.imageChange(e)} />
					</form>
					<div>
						{imagePreview}
					</div>
				</Dialog>
				<Dialog
					actions={imageViewActions}
					contentStyle={{ width: "90%", maxWidth: '90%' }}
					title="Просмотр выбраного фото"
					modal={false}
					open={this.state.imageViewOpened}
					onRequestClose={this.handleCloseImageView.bind(this)}
					autoScrollBodyContent={true}>
					<div>
						<img style={{ height: "42vw", display: "block", margin: "0 auto" }} src={this.state.currentImg.src} />
					</div>
				</Dialog>
			</div>
		);
	}
};

export default ImageUploader;