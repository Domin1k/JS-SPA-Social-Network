'use strict';

socialNetwork.controller('userController', function ($scope, $location, $http, $rootScope, authorizationService, userService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.go = function (path) {
        $location.path(path);
    };

    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
        $rootScope.title = currentRoute.title;
    });

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

    $scope.fillEditProfileData = function () {
        if ($location.path() === '/users/profile') {
            userService.getDataAboutMe()
                .then(function (data) {
                    $scope.profileData = data;
                }, function (err) {
                    console.log(err);
                });
        }
    };
    $scope.fillEditProfileData();

    $scope.fileLoaded = function (ev) {
        var tgt = ev.target || window.event.srcElement,
            files = tgt.files;

        if (FileReader && files && files.length) {
            var fileReader = new FileReader();
            fileReader.onload = function () {

                $scope.loadedFile = fileReader.result;
                $scope.$apply();
            };
            fileReader.readAsDataURL(files[0]);
        } else {
            // Not supported
        }
    };

    $scope.editUserProfile = function (profileData) {
        userService.editProfile(profileData)
            .then(function (data) {
                console.log(data);
                $location.path('/feeds');
            }, function (error) {
                console.log(error);
            })
    };
    
    $scope.changePassword = function (userData) {
        userService.changeUserPassword(userData)
            .then(function (data) {
                console.log(data);
                $location.path('/feeds');
            }, function (error) {
                console.log(error);
            })
    };

});