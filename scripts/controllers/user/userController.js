'use strict';

socialNetwork.controller('userController', function ($scope, $location, $http, $rootScope, $route, authorizationService, userService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.userDetails = function () {
        if (authorizationService.isLoggedIn()) {
            if (sessionStorage['currentUsername'] && sessionStorage['currentUserprofilepic']) { // Optimize query to the database
                $scope.currentUsername = sessionStorage['currentUsername'];
                $scope.currentUserprofilepic = sessionStorage['currentUserprofilepic'];
            }else {
                authorizationService.getUserPreviewData()
                    .then(function (data) {
                        $scope.currentUsername = data.username;
                        $scope.currentUserprofilepic = data.profileImageData;
                        sessionStorage['currentUsername'] = data.username;
                        sessionStorage['currentUserprofilepic'] = data.profileImageData;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    };

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
                authorizationService.clearUserTemporaryData();
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
                $route.reload();
                authorizationService.clearUserTemporaryData();
            }, function (error) {
                console.log(error);
            })
    };
    
    $scope.changePassword = function (userData) {
        userService.changeUserPassword(userData)
            .then(function (data) {
                console.log(data);
                $location.path('/feeds');
                $route.reload();
            }, function (error) {
                console.log(error);
            })
    };



    // Function calls
    $scope.userDetails();
    $scope.fillEditProfileData();

});