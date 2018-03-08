import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from "material-ui/TextField";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RestApiCalls from "../Services/RestApiCalls";
import Dialog from "material-ui/Dialog";
import { purple50, cyan500, pink700 } from 'material-ui/styles/colors';
import $ from "jquery";

var cardStyle = {
	display: 'block',
	maxWidth: '500px',
	margin: "0 auto"
}

const templateTypes = ["text", "fullwidth", "halfwidth"];
let floatingLabelStyle = {
	floatingLabelStyle: {
		color: pink700
	},
	floatingLabelFocusStyle: {
		color: cyan500
	}
}
class MainPageTemplatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpened: false,
			dropDownValue: undefined,
			items: [],
			value: undefined,
			type: undefined,
			secondary: undefined,
			link: undefined,
			secondaryLink: undefined,
			file: undefined,
			secondaryFile: undefined,
			primary: true
		}
		this.openFileInput = this.openFileInput.bind(this);
	}

	readExistingConfig() {
		const that = this;
		$.getJSON('incanto.json',
			function(data) {
				that.setState({ items: data });
			});

		return [];
	}

	openAddItemDialog() {
		this.setState({ dialogOpened: true });
	}

	removeItem(item) {
		const handleCloseItemRemoved = this.handleCloseDialog.bind(this);
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		let items = this.state.items;
		items.splice(items.indexOf(item), 1);

		let formData = new FormData(this);
		formData.set("type", item.type);
		formData.set("value", item.value);
		RestApiCalls.post("/api/HomePage/UpdateItems", formData, config).then(() => {
			handleCloseItemRemoved();
		});
	}

	getCard(item) {
		const removeItemClickHandler = this.removeItem.bind(this);
		let mediaValue = undefined;
		let linkValue = undefined;
		switch (item.type) {
		case templateTypes[0]:
			mediaValue = <div>{item.value}</div>;
			linkValue = <a href={item.link} />;
			break;
		case templateTypes[1]:
				mediaValue = <img style={{ width: "100%" }} src={"MainPage/" + item.value} />;
			linkValue = <a href={item.link} />;
			break;
		case templateTypes[2]:
			mediaValue =
				<div><img style={{ width: "50%" }} src={"MainPage/" + item.value} /><img style={{ width: "50%" }} src={"MainPage/" + item.secondary} /></div>;

			linkValue = <div>
					<a href={item.link} /> <a href={item.secondaryLink} />
				</div>;
			break;
		}

		return <Card key={item.value} style={cardStyle}>
				<CardHeader title={item.link !== undefined ? item.link : item.value}/>
				<CardMedia>
					{mediaValue}
				</CardMedia>
				<CardText>
					{linkValue}
				</CardText>
				<CardActions>
				<FlatButton label="Remove" onClick={() => removeItemClickHandler(item)}/>
				</CardActions>
			</Card>;
	}

	handleSaveDialog () {
		let formData = new FormData(this);
		const handleCloseNewItemAdded = this.handleCloseDialog.bind(this);
		const config = { headers: { 'content-type': 'multipart/form-data' } };

		formData.set("link", this.state.link);
		if (this.state.type === templateTypes[0]) {
			formData.set("text", this.state.value);
			RestApiCalls.post("/api/HomePage/AddTextBlock", formData, config).then(() => {
				handleCloseNewItemAdded();
			});
		} else {
			formData.set("file", this.state.file);
			if (this.state.type === templateTypes[1]) {
				RestApiCalls.post("/api/HomePage/AddSingleImageBlock", formData, config).then(() => {
					handleCloseNewItemAdded();
				});
			} else if (this.state.type === templateTypes[2]) {
				formData.set("secondaryFile", this.state.secondaryFile);
				formData.set("secondaryLink", this.state.secondaryLink);
				RestApiCalls.post("/api/HomePage/AddMultipleImageBlock", formData, config).then(() => {
					handleCloseNewItemAdded();
				});
			}
		}
	}

	handleCloseDialog() {
		let existingItems = this.readExistingConfig();
		this.setState({
			items: existingItems,
			dialogOpened: false,
			type: undefined,
			dropDownValue: undefined,
			value: undefined,
			link: undefined,
			secondaryLink: undefined,
			file: undefined,
			secondaryFile: undefined });
	}

	handleDropdownChange(event, index, value) {
		this.clearDataAboutPhoto();
		this.setState({
			dropDownValue: value, type: templateTypes[value - 1],
			value: undefined,
			link: undefined,
			secondaryLink: undefined,
			file: undefined,
			secondaryFile: undefined });
	}

	componentWillMount() {
		let existingItems = this.readExistingConfig();
		this.setState({ items: existingItems });
	}

	getDialogTextBlock() {
		const that = this;
		return <div>
			<TextField
				fullWidth={true}
				floatingLabelText="Значение:"
				floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
				floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
				style={{ display: "block" }}
				onChange={(e) => that.setState({ value: e.target.value })}></TextField>
			<TextField
				fullWidth={true}
				floatingLabelText="Ссылка(опционально):"
				floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
				floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
				style={{ display: "block" }}
				onChange={(e) => that.setState({ link: e.target.value})}></TextField>
		</div>;
	}

	getDialogSingleImageBlock() {
		const that = this;
		return <div>
			<form>
				<input
					ref={(input) => { this.fileInput = input; }}
					style={{ visibility: "hidden" }}
					type="file"
					onChange={(e) => this.imageChange(e)} />
			</form>
			<RaisedButton
				label={"Выберите фото"}
				onClick={() => that.openFileInput(true)} />
			{this.state.file != undefined ? <span> {this.state.file.name}</span> : <span>Фото №1 не выбрано</span>}
			<TextField
				fullWidth={true}
				floatingLabelText="Ссылка(опционально):"
				floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
				floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
				style={{ display: "block" }}
				onChange={(e) => that.setState({ link: e.target.value })}></TextField>
		</div>;
	}

	getDialogMultipleImagesBlock() {
		const that = this;
		return <div>
			       <form>
				       <input
					       ref={(input) => { this.fileInput = input; }}
					       style={{ visibility: "hidden" }}
					       type="file"
					       onChange={(e) => this.imageChange(e)} />
			       </form>
			       <RaisedButton
						label={"Выберите первое фото"}
						onClick={() => that.openFileInput(true)} />
			       <RaisedButton
						label={"Выберите второе фото"}
					   onClick={() => that.openFileInput(false)} />
					<br />
					{this.state.file != undefined ? <span> {this.state.file.name}</span> : <span>Фото №1 не выбрано &nbsp; </span>}
				   {this.state.secondaryFile != undefined ? <span> {this.state.secondaryFile.name}</span> : <span>Фото №2 не выбрано</span>}
				   <TextField
					   fullWidth={true}
					   floatingLabelText="Ссылка(опционально):"
					   floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
					   floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
					   style={{ display: "block" }}
					   onChange={(e) => that.setState({ link: e.target.value })}></TextField>
				   <TextField
					   fullWidth={true}
						floatingLabelText="Вторая ссылка(опционально):"
						floatingLabelStyle={floatingLabelStyle.floatingLabelStyle}
						floatingLabelFocusStyle={floatingLabelStyle.floatingLabelFocusStyle}
						style={{ display: "block" }}
						onChange={(e) => that.setState({ secondaryLink: e.target.value })}></TextField>
		</div>;
	}


	imageChange(e) {
		e.preventDefault();
		let files = e.target.files;
		let that = this;
		if (files.length === 1) {
			const file = files[0];
			let reader = new FileReader();
			reader.onloadend = function () {
				if (this.readyState === FileReader.DONE) {
					const selectedImage = { src: reader.result, file: file };
					if (that.state.primary) {
						that.setState({ value: selectedImage.src, file: selectedImage.file });
					} else {
						that.setState({ secondary: selectedImage.src, secondaryFile: selectedImage.file });
					}
				}
			};
			reader.readAsDataURL(file);
		}

		this.clearDataAboutPhoto();
	}

	openFileInput(primary) {
		this.state.primary = primary;
		this.fileInput.click();
	}

	clearDataAboutPhoto() {
		if (this.fileInput !== undefined && this.fileInput !== null) {
			this.fileInput.value = "";
		}
	}

	render() {
		const that = this;
		const list = this.state.items !== undefined && this.state.items.length > 0 
			? this.state.items.map((item) => {
				return <li key={"card-list-item" + item.value}>{that.getCard(item)}</li>;
			})
			: <span />;
		const dropDownValues = templateTypes.map((type, index) => {
			return <MenuItem key={type + index} value={index+1} primaryText={type} />;
		});
		let selectedTemplate = undefined;
		if (this.state.type !== undefined) {
			switch (this.state.type) {
				case templateTypes[0]:
					selectedTemplate = this.getDialogTextBlock();
					break;
				case templateTypes[1]:
					selectedTemplate = this.getDialogSingleImageBlock();
					break;
				case templateTypes[2]:
					selectedTemplate = this.getDialogMultipleImagesBlock();
					break;
			}
		}
		const actions = [
			<FlatButton
				label="Отмена"
				primary={true}
				onClick={this.handleCloseDialog.bind(this)}
			/>,
			<FlatButton
				label="Сохранить"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleSaveDialog.bind(this)}
			/>
		];
		const dialog = <Dialog title="Добавить на главную" style={{ display: "block" }}
			open={this.state.dialogOpened}
			modal={false}
			actions={actions}>
			<DropDownMenu value={this.state.dropDownValue || -1} onChange={this.handleDropdownChange.bind(this)} style={{ display: "block" }}>
				<MenuItem key="select-dropdown-value" style={{ display: "none" }} value={-1} primaryText="Выберите значение" />
				{dropDownValues}
			</DropDownMenu>
			{selectedTemplate}
		</Dialog>;
		return <div>
			{dialog}
			<FlatButton secondary={true} label="Добавить" onClick={this.openAddItemDialog.bind(this)}/>
				<ul>
					{list}
				</ul>
		</div>;
	}
}

export default MainPageTemplatePage;