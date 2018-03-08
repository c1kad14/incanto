import React from "react";
import Dialog from 'material-ui/Dialog';
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
			imageSource: [],
			imagesToRemove: [],
			imageViewOpened: false,
			imageUploadOpened: false,
			lastId: 0,
			selectedItem: this.props.selectedItem
		};
		this.imageChange.bind(this);
	}

	imageChange (e) {
		e.preventDefault();
		const imageSource = this.state.imageSource;
		let files = e.target.files;
		let that = this;
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				let reader = new FileReader();
				reader.onloadend = function () {
					if (this.readyState === FileReader.DONE) {
						const selectedImage = { src: reader.result, file: file };
						imageSource.push({
							priority: that.state.lastId,
							src: selectedImage.src,
							file: selectedImage.file,
							itemId: that.state.selectedItem.id
						});
						that.state.lastId = that.state.lastId + 1;
						that.setState({ imageSource: imageSource});
					}
				};
				reader.readAsDataURL(file);
			}

		}

		this.clearDataAboutPhoto();
	}

	handleCloseImageUpload () {
		this.setState({imageUploadOpened: false, imageSource: [], imagesToRemove: [], lastId: 0 }, this.props.refreshDataTable);
	}

	clearDataAboutPhoto () {
		this.fileInput.value = "";
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

	uploadImages() {
		this.setState({ disabled: true });
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

		this.setState({ imageSource: imageSource, imageViewOpened: false });
	} 

	componentWillReceiveProps(nextProps) {
		this.processExistingImages(nextProps);
	}

	componentWillMount() {
		this.props.uploaderActions.openDialog = this.openImageUploadDialog.bind(this);
		this.processExistingImages(this.props);
		this.state.disabled = false;
	}

	render() {
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

		let imageUploadActions = [
			<RaisedButton
				label={"Выберите фото"}
				onClick={this.openFileInput.bind(this)} />,
			<RaisedButton
				label={"Закрыть"}
				secondary={true}
				onClick={this.handleCloseImageUpload.bind(this)} />

		];
		if (this.state.imageSource.length > 0) {
			imageUploadActions.push(
				<RaisedButton
					disabled={this.state.disabled}
					primary={true}
					label={"Сохранить"}
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
							multiple="multiple"
							onChange={(e) => this.imageChange(e)} />
					</form>
					<div>
						{imagePreview}
					</div>
				</Dialog>

			</div>
		);
	}
};

export default ImageUploader;