'use strict';

socialNetwork.factory('authorizationService', function ($http, BASE_URL, $q) {
    var serviceUrl = BASE_URL + '/users';
    var requester = {};

    requester.login = function (loginData) {
        var deffer = $q.defer();
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data) {
                deffer.resolve(data);
            }).error(function (error) {
                deffer.reject(error);
            });
        return deffer.promise;
    };
    
    requester.register = function (rawRegisterData) {
        var registerData = {
            "username": rawRegisterData.username,
            "password": rawRegisterData.password,
            "confirmPassword": rawRegisterData.confirmPassword,
            "name": rawRegisterData.name,
            "email": rawRegisterData.email,
            "gender": 0
        };
        var deffer = $q.defer();
        $http.post(serviceUrl + '/Register', registerData)
            .success(function (data) {
                deffer.resolve(data);
            }).error(function (error) {
                deffer.reject(error);
            });
        return deffer.promise;
    };

    requester.setUserCredentials = function (userCredentials) {
        sessionStorage['username'] = userCredentials.userName;
        sessionStorage['access_token'] = 'bearer ' + userCredentials.access_token;
    };

    requester.clearUserCredentials = function () {
        if (sessionStorage.hasOwnProperty('username')) {
            sessionStorage.removeItem('username');
        }
        if (sessionStorage.hasOwnProperty('access_token')) {
            sessionStorage.removeItem('access_token');
        }
    };

    return requester;
});