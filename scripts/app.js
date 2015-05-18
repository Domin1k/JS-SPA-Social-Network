'use strict';

var socialNetwork = angular.module('socialNetwork', ['ngRoute']);

socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: './templates/welcome-view.html',
        controller: 'welcomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: './templates/user/login-view.html',
        controller: 'loginController'
    });

    $routeProvider.when('/register', {
        templateUrl: './templates/user/register-view.html',
        controller: 'registerController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});
