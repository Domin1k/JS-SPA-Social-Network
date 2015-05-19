'use strict';

var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'ngResource']);

socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: './templates/public/welcome-view.html',
        controller: 'welcomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: './templates/public/login-view.html',
        controller: 'userController'
    });

    $routeProvider.when('/register', {
        templateUrl: './templates/public/register-view.html',
        controller: 'userController'
    });

    $routeProvider.when('/feeds', {
        templateUrl: './templates/non-public/newsFeed-view.html',
        controller: 'feedsController'
    });

    $routeProvider.when('/profile', {
        // TODO
    });

    $routeProvider.otherwise({redirectTo: '/'});
});
