import NotificationService from "./NotificationService";
import RestApiCalls from "./RestApiCalls";

class DataService {
	constructor() {
		this.errorOccured = "Возникла ошибка: ";
	}
	//Get collection of object using api (host/api/controller/GetList)
	static getItems(controller, callback) {
	    let errorMessage = this.errorOccured;
		return RestApiCalls.get(`/api/${controller}/GetList`).then(function (response) {
			//NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
			//console.log("Data service finished");
			if (callback !== null) {
			    callback(response.data);
			}
		    //return response;
		}).catch(function (err) {
		//	NotificationService.addNotification(errorMessage + err, function () { }, false, false);
		});
	}
	static getItemsWithParameters(controller, parameters, callback) {
		let errorMessage = this.errorOccured;
		return RestApiCalls.get(`/api/${controller}/GetList?${parameters}`).then(function (response) {
			//NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
			//console.log("Data service finished");
			if (callback !== null) {
				callback(response.data);
			}
			//return response;
		}).catch(function (err) {
			//	NotificationService.addNotification(errorMessage + err, function () { }, false, false);
		});
	}

	//Get object by id using api (host/api/controller/GetObject)
	static getObject(controller, objectId, callback) {
		RestApiCalls.get(`/api/${controller}/Get?id=${objectId}`).then(function (response) {
			//NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
		    if (callback !== null) {
		        callback(response.data);
		    }
		}).catch(function (err) {
			console.log(err);
			//	NotificationService.addNotification(this.errorOccured + err, function () { }, false, false);
		});
	}
	//Add new object using api (host/api/controller/Add)
	static addObject(controller, model, callback) {
		RestApiCalls.post(`/api/${controller}/Add`, model).then(function (response) {
			//NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
		    if (callback !== null) {
		        callback(response.data);
		    }
		}).catch(function (err) {
			console.log(err);
			//NotificationService.addNotification(this.errorOccured + err, function () { }, "Закрыть", false, false);
		});
	}
	//Update object by model using api (/api/controller/Update) in server
	static updateObject(controller, model, callback) {
		RestApiCalls.put(`/api/${controller}/Update`, model).then(function (response) {
		//	NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
			if (callback !== null) {
				callback(response.data);
			}
		}).catch(function (err) {
			console.log(err);
			//NotificationService.addNotification(this.errorOccured + err, function () { }, false, false);
		});
	}
	//Delete object by model using api (/api/${controller}/delete) model should contain "id" property
	static deleteObject(controller, model, callback) {
		RestApiCalls.del(`/api/${controller}/Delete?id=${model.id}`)
			.then(function (response) {
			//	NotificationService.addNotification(response.data.message, function () { }, true, response.data.wasSuccessful);
				callback();
			}).catch(function (err) {
				//NotificationService.addNotification(this.errorOccured + err, function () { }, false, false);
			});
	}
}

export default DataService;