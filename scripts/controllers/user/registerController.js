'use strict';

socialNetwork.controller('registerController', function ($scope, $location, authorizationService) {
    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.registerUser = function (registerData) {
        authorizationService.register(registerData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                // Redirect
            }, function (error) {
                console.log(error);
            });
    }
});