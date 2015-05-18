'use strict';

socialNetwork.controller('loginController', function ($scope, $location, authorizationService) {
    $scope.go = function (path) {
        $location.path(path);
    };
    
    $scope.loginUser = function (loginData) {
        authorizationService.login(loginData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/feeds');
            }, function (error) {
                console.log(error);
            });
    };


});