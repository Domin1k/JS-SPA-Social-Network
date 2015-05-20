'use strict';

socialNetwork.controller('feedsController', function ($scope, $http, $location, userService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.getFriends = function () {
        if ($location.path() === '/feeds') {
            userService.getOwnFriends()
                .then(function (allFriendsData) {
                    $scope.ownFriendsCollection = allFriendsData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getNewsFeed = function () {
        if ($location.path() === '/feeds') {
            userService.getNewsFeed()
                .then(function (newsFeedData) {
                    $scope.newsfeed = newsFeedData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    // Functions calls
    $scope.getFriends();
    $scope.getNewsFeed();
});