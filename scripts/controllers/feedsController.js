'use strict';

socialNetwork.controller('feedsController', function ($scope) {
    $scope.userDetails = {
        username: sessionStorage['username'],
        userProfilePicture: localStorage['user-profileImage']
    };
});