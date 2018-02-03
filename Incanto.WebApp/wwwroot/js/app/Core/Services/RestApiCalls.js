import Axios from "axios/dist/axios";

export default class RestApiCalls {
    static get(url) {
		return Axios.get(url).then((response) => { return response;  });
    }

    static post(url, model) {
        return Axios.post(url, model);
    }

    static put(url, model) {
        return Axios.put(url, model);
    }

    static del(url) {
        return Axios.delete(url);
	}

	static deleteMultiple(url, model) {
		return Axios.delete(url, model);
	}

    //static _getAuthorizationHeadersConfig() {
    //    return UserService.getUser()
    //        .then(function (user) {
    //            const config = {};
    //            if (user) {
    //                const authHeader = "Bearer ".concat(user.access_token);
    //                config.headers = { Authorization: authHeader };
    //                config.withCredentials = true;
    //            }
    //            return config;
    //        });
    //}
};