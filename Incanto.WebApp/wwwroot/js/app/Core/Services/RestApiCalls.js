﻿import Axios from "axios/dist/axios";

export default class RestService {
    static get(url) {
        return Axios.get(url);
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