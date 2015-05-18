'use strict';

var socialNetwork = angular.module('socialNetwork', ['ngRoute']);

socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: './templates/public/welcome-view.html',
        controller: 'welcomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: './templates/public/login-view.html',
        controller: 'loginController'
    });

    $routeProvider.when('/register', {
        templateUrl: './templates/public/register-view.html',
        controller: 'registerController'
    });

    $routeProvider.when('/feeds', {
        templateUrl: './templates/non-public/newsFeed-view.html',
        controller: 'feedsController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});
