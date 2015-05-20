'use strict';

socialNetwork.controller('feedsController', function ($scope, $http, $location, $route, userService, postService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.getMyFriends = function () {
        if ($location.path() === '/users/feeds') {
            userService.getOwnFriends()
                .then(function (allFriendsData) {
                    $scope.ownFriendsCollection = allFriendsData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getWallsPost = function () {
        if ($location.path() === '/users/feeds') {
            userService.getWallsPost()
                .then(function (newsFeedData) {
                    $scope.newsfeed = newsFeedData;
                }, function (error) {
                    console.log(error);
                });
        }
    };



    // Functions calls
    $scope.getMyFriends();
    $scope.getWallsPost();
});