'use strict';

socialNetwork.controller('postController', function ($scope, $http, $route, $routeParams, $rootScope, postService) {
    
    // Authorization token
    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];
    
    $scope.deletePost = function (post) {
        if (confirm('Are you sure you want to delete this post?')) {
            postService.deletePostById(post.id)
                .then(function (data) {
                    var postIndex = $scope.wallFeeds.indexOf(post);
                    $scope.wallFeeds.splice(postIndex, 1);
                }, function (error) {
                    console.log(error);
                })
        }
    };

    $scope.deleteFeedPost = function (post) {
        if (confirm('Are you sure you want to delete this post?')) {
            postService.deletePostById(post.id)
                .then(function (data) {
                    var postIndex = $scope.newsFeeds.indexOf(post);
                    $scope.newsFeeds.splice(postIndex, 1);
                }, function (error) {
                    console.log(error);
                })
        }
    };
    $scope.addWallPost = function (postData) {
        console.log(postData);
        postData['username'] = $routeParams.username;
        postService.addPost(postData)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (error) {
                console.log(error);
            });
    };

    $scope.likePost = function (post) {
        postService.likePost(post.id)
            .then(function (data) {
                post.liked = data.liked;
                post.likesCount = data.likesCount;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.dislikePost = function (post) {
        postService.dislikePost(post.id)
            .then(function (data) {
                post.liked = data.liked;
                post.likesCount = data.likesCount;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.editPost = function (post) {
        postService.editPostById(post)
            .then(function (data) {
                console.log(data);
                $rootScope.isEditActivated = false;
            }, function (error) {
                console.log(error);
            });
    };
});