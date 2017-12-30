import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Text from "./Text";
import ImagesGrid from "./ImagesGrid";
import DataService from "../Services/DataService";
//import FormControls from "./Controls/FormControls";
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

	handleSaveImage () {
		var hasErrors = false;
		for (let i = 0; i < this.photoFieldsData.length; i++) {
			if (this.photoFieldsData[i].checkErrors()) {
				hasErrors = true;
			}
		}
		if (!hasErrors) {
			const imageSource = this.state.imageSource;
			imageSource.push({
				id: this.state.lastId,
				src: this.state.currentImg.src,
				file: this.state.currentImg.file,
				title: this.state.currentImg.title,
				type: this.state.currentImg.type,
				author: ""
			});
			this.clearDataAboutPhoto();
			this.setState({ imageSource: imageSource, imageViewOpened: false, currentImg: {} });
			this.state.lastId = this.state.lastId + 1;
		}
	}

	clearDataAboutPhoto () {
		for (let i = 0; i < this.photoFieldsData.length; i++) {
			this.photoFieldsData[i].value = "";
		}
	}



	removeImage (image) {
		const imageSource = this.state.imageSource;
		for (let i = 0; i < imageSource.length; i++) {
			if (imageSource[i].id === image.id) {
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
		let formData = new FormData();
		for (let i = 0; i < this.state.imageSource.length; i++) {
			formData.append("files", this.state.imageSource[i].file);
			formData.append("titles", this.state.imageSource[i].title);
			formData.append("types", this.state.imageSource[i].type);
		}
		formData.set("itemId", itemId);
		const config = { headers: { 'content-type': 'multipart/form-data' } }
		const handleCloseImageUpload = this.handleCloseImageUpload;
		const imageUploaded = this.imageUploaded;
		DataService.post(this.props.uploadController,
			formData,
			config,
			(function(response) {
				handleCloseImageUpload();
				const result = response.data;
				//LocalDbService.getObject("buildings",
				//	itemId,
				//	function(buildingRecord) {
				//		for (let i = 0; i < result.length; i++) {
				//			if (result[i].wasSuccessful === true) {
				//				imageUploaded(result[i].record);
				//				if (buildingRecord.photos === undefined) {
				//					buildingRecord.photos = [];
				//				}
				//				buildingRecord.photos.push(result[i].record);
				//			}
				//		}
				//		LocalDbService.updateObject("buildings", buildingRecord);
				//	});
			}));
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
					removeImage={this.removeImage}
					imageSource={this.state.imageSource} />
			);
		} else {
			imagePreview = (<image>{"choose image"}</image>);
		}
		const imageViewActions = [
			<FlatButton
				label={"save"}
				primary={true}
				onClick={this.handleSaveImage} />,
		];
		const imageUploadActions = [
			<RaisedButton
				label={"choose file"}
				primary={true}
				onClick={this.openFileInput.bind(this)} />,
			<RaisedButton
				label={"close"}
				secondary={true}
				onClick={this.handleCloseDialog} />

		];
		if (this.state.imageSource.length > 0) {
			imageUploadActions.push(
				<FlatButton
					label={"upload"}
					primary={true}
					onClick={this.uploadImages} />);
		}
		return (
			<div>
				<Dialog
					actions={imageUploadActions}
					contentStyle={{ width: "90%", maxWidth: 'none' }}
					title={"add image"}
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
					<imgPreview>
						{imagePreview}
					</imgPreview>
				</Dialog>
				<Dialog
					actions={imageViewActions}
					contentStyle={{ width: "90%", maxWidth: 'none' }}
					title="image info"
					modal={false}
					open={this.state.imageViewOpened}
					onRequestClose={this.handleCloseImageView}
					autoScrollBodyContent={true}>
					<div>

						<img style={{ height: "42vw", display: "block", margin: "0 auto" }} src={this.state.currentImg.src} />
					</div>
				</Dialog>
			</div>
		);
	}
};
//<FormControls
//	formFields={this.photoFieldsData}
//	model={this.state.currentImg}
//	localizationInfo={this.localization.controls} />
export default ImageUploader;