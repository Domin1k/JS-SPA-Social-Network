'use strict';

socialNetwork.controller('userController', function ($scope, $location, $http, authorizationService) {
    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.loginUser = function (loginData) {
        authorizationService.login(loginData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.registerUser = function (registerData) {
        authorizationService.register(registerData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.logoutUser = function () {
        authorizationService.logout()
            .then(function (data) {
                console.log(data);
                authorizationService.clearUserCredentials();
                $location.path('/');
            }, function (err) {
                console.log(err);
            })
    };
});