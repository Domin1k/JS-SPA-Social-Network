'use strict';

socialNetwork.factory('authorizationService', function (BASE_URL, mainRequesterService) {
    var serviceUrl = BASE_URL + '/users';
    var serviceRequester = {};

    serviceRequester.login = function (loginData) {
        return mainRequesterService.postRequest(serviceUrl + '/login', loginData);
    };

    serviceRequester.register = function (rawRegisterData) {
        var registerData = {
            "username": rawRegisterData.username,
            "password": rawRegisterData.password,
            "confirmPassword": rawRegisterData.confirmPassword,
            "name": rawRegisterData.name,
            "email": rawRegisterData.email,
            "gender": rawRegisterData.gender
        };
        return mainRequesterService.postRequest(serviceUrl + '/register', registerData);
    };

    serviceRequester.logout = function () {
        return mainRequesterService.postRequest(serviceUrl + '/logout', {});
    };

    serviceRequester.getUserPreviewData = function () {
        var currentUser = sessionStorage['username'];
        var url = serviceUrl + '/' + currentUser + '/preview';

        return mainRequesterService.getRequest(url, {});
    };

    serviceRequester.setUserCredentials = function (userCredentials) {
        sessionStorage['username'] = userCredentials.userName;
        sessionStorage['access_token'] = 'bearer ' + userCredentials.access_token;
    };

    serviceRequester.clearUserCredentials = function () {
        if (sessionStorage.hasOwnProperty('username')) {
            sessionStorage.removeItem('username');
        }
        if (sessionStorage.hasOwnProperty('access_token')) {
            sessionStorage.removeItem('access_token');
        }
        localStorage.clear();
    };

    serviceRequester.GetHeaders = function() {
        return {
            Authorization: "Bearer " + sessionStorage['access_token']
        };
    };

    serviceRequester.isLoggedIn = function () {
        return !!sessionStorage.getItem('access_token');
    };

    return serviceRequester;
});