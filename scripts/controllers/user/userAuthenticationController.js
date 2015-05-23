'use strict';

socialNetwork.controller('userAuthenticationController', function ($scope, $location, $http, $route, authorizationService) {

    // Authorization token
    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.loginUser = function (loginData) {
        authorizationService.login(loginData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/users/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.registerUser = function (registerData) {
        authorizationService.register(registerData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/users/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.logoutUser = function () {
        authorizationService.logout()
            .then(function (data) {
                console.log(data);
                authorizationService.clearUserCredentials();
                authorizationService.clearUserTemporaryData();
                sessionStorage.clear();
                $route.reload();
                $location.path('/');
            }, function (err) {
                console.log(err);
            })
    };
});