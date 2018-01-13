import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ImagesGrid from "./ImagesGrid";
import RestApiCalls from "../Services/RestApiCalls";
import RaisedButton from 'material-ui/RaisedButton';

class ImageUploader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: "",
			imagePreviewUrl: "",
			imageSource: [],
			imageViewOpened: false,
			imageUploadOpened: false,
			currentImg: {},
			lastId: 0,
			photoFieldsData: [
				{
					name: "type",
					type: "select",
					value: "",
					maxSearchResults: 5,
					dataSourceLink: "",
					displayedValue: "code",
					modelValue: "id",
					itemFormat: "[id] [code] [description]",
					isRequired: true
				},
				{
					name: "title",
					type: "text",
					value: "",
					isRequired: true
				}
			]
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
		this.setState({ imageViewOpened: false, currentImg: {} });
	}

	handleCloseImageUpload () {
		this.setState({ imageUploadOpened: false });
	}

	handleCloseDialog() {
		this.setState({ galleryOpened: false, addPhotoOpened: false });
	}

	handleSaveImage () {
		var hasErrors = false;
		//for (let i = 0; i < this.state.photoFieldsData.length; i++) {
		//	if (this.state.photoFieldsData[i].checkErrors()) {
		//		hasErrors = true;
		//	}
		//}
		if (!hasErrors) {
			const imageSource = this.state.imageSource;
			imageSource.push({
				priority: this.state.lastId,
				src: this.state.currentImg.src,
				file: this.state.currentImg.file,
				itemId: "1",
				type: this.state.currentImg.type
			});
			this.clearDataAboutPhoto();
			this.setState({ imageSource: imageSource, imageViewOpened: false, currentImg: {} });
			this.state.lastId = this.state.lastId + 1;
		}
	}

	clearDataAboutPhoto () {
		for (let i = 0; i < this.state.photoFieldsData.length; i++) {
			this.state.photoFieldsData[i].value = "";
		}
		this.fileInput.value = "";
	}

	removeImage (image) {
		const imageSource = this.state.imageSource;
		for (let i = 0; i < imageSource.length; i++) {
			if (imageSource[i].priority === image.priority) {
				imageSource.splice(i, 1);
			}
		}
		this.setState({ imageSource: imageSource });
	}

	imageUploaded (image) {
		if (this.props.imageUploadedFunc !== undefined) {
			this.props.imageUploadedFunc(image);
		}
	}

	uploadImages () {
		const itemId = this.props.baseItemId;
		let formData = new FormData(this);
		for (let i = 0; i < this.state.imageSource.length; i++) {
			formData.append("files", this.state.imageSource[i].file);
			formData.append("priorities", this.state.imageSource[i].priority);
		}
		formData.set("itemId", itemId);
		const config = { headers: { 'content-type': 'multipart/form-data' } }
		const handleCloseImageUpload = this.handleCloseImageUpload;
		const imageUploaded = this.imageUploaded;
		RestApiCalls.post(`/api/${this.props.uploadController}/UploadPhotos`, formData, config).then(function(response) {
				handleCloseImageUpload();
				const result = response.data;
			});
		this.state.imageSource = [];
	}

	openFileInput () {
		this.fileInput.click();
	}

	openImageUploadDialog () {
		this.setState({ imageUploadOpened: true });
	}

	componentWillMount() {
		this.props.uploaderActions.openDialog = this.openImageUploadDialog.bind(this);
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
					title={"Добавить фото к товару"}
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