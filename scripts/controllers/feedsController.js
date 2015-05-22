'use strict';

socialNetwork.controller('feedsController', function ($scope, $http, $location, $route, userService, authorizationService) {

    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    var Paths = {
        feedPath : '/users/feeds',
        wallPath : '/users/wall/',
        profilePath : '/users/profile',
        friendsList: '/users/friendslist'
    };

    $scope.getMyFriends = function () {
        if ($location.path() === Paths.feedPath ||
            $location.path() === Paths.friendsList) {
            userService.getOwnFriends()
                .then(function (allFriendsData) {
                    $scope.ownFriendsCollection = allFriendsData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    // Functions calls
    if (authorizationService.isLoggedIn()) {
        $scope.getMyFriends();

    }
});