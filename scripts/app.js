'use strict';

var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'ngResource']);

socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api');
socialNetwork.constant('PAGE_SIZE', 2);

socialNetwork.config(function ($routeProvider) {

    $routeProvider.when('/', {
        title: 'Welcome',
        templateUrl: './templates/public/welcome-view.html',
        controller: 'welcomeController'
    });

    $routeProvider.when('/login', {
        title: 'Login',
        templateUrl: './templates/public/login-view.html',
        controller: 'userAuthenticationController'
    });

    $routeProvider.when('/register', {
        title: 'Register',
        templateUrl: './templates/public/register-view.html',
        controller: 'userAuthenticationController'
    });

    $routeProvider.when('/users/feeds', {
        title: 'News Feed',
        templateUrl: './templates/non-public/newsFeed-view.html',
        controller: 'userController'
    });

    $routeProvider.when('/users/profile', {
        templateUrl: './templates/non-public/user-profile-view.html',
        controller: 'userController',
        title: 'Edit Profile'
    });

    $routeProvider.when('/users/changePassword', {
        templateUrl: './templates/non-public/user-changePassword-view.html',
        controller: 'userController',
        title: 'Change Password'
    });

    $routeProvider.when('/users/wall/:username', {
        templateUrl: './templates/non-public/user-wall-view.html',
        controller: 'userController',
        title: 'Wall'
    });

    $routeProvider.when('/users/friendslist', {
        templateUrl: './templates/non-public/user-friendslist-view.html',
        controller: 'feedsController',
        title: 'Friends'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});

socialNetwork.run(function ($rootScope, $location, authorizationService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        // Authorization check: anonymous site visitors cannot access user routes
        if ($location.path().indexOf("/users/") != -1 && !authorizationService.isLoggedIn()) {
            $location.path("/");
        }
        // Authorization check: logged users cannot access login/register routes
        if ($location.path().indexOf("/users") == -1 && authorizationService.isLoggedIn()) {

            $location.path("/users/feeds");
        }
    });
});
