'use strict';

socialNetwork.controller('feedsController', function ($scope, $http, $location, $route, userService, postService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    $scope.getMyFriends = function () {
        if ($location.path() === '/users/feeds' ||
            $location.path() === '/users/friendslist') {
            userService.getOwnFriends()
                .then(function (allFriendsData) {
                    $scope.ownFriendsCollection = allFriendsData;
                }, function (error) {
                    console.log(error);
                });
        }
    };


    // Functions calls
    $scope.getMyFriends();
});