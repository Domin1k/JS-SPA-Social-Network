'use strict';

socialNetwork.controller('userController', function ($scope, $location, $http, $rootScope, $route,
                                                     $routeParams, authorizationService, userService,
                                                     postService, commentService) {
    // Authorization token
    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];


    $scope.userDetails = function () {
        if (authorizationService.isLoggedIn()) {
            if (sessionStorage['currentUsername'] && sessionStorage['currentUserprofilepic']) { // Optimize query to the database
                $scope.currentUsername = sessionStorage['currentUsername'];
                $scope.currentUserprofilepic = sessionStorage['currentUserprofilepic'];
            }else {
                authorizationService.getUserPreviewData()
                    .then(function (data) {
                        $scope.currentUsername = data.username;
                        $scope.currentUserprofilepic = data.profileImageData;
                        sessionStorage['currentUsername'] = data.username;
                        sessionStorage['currentUserprofilepic'] = data.profileImageData;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    };

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.goToMyWall = function (username) {
        $location.path('/users/wall/' + username);
    };

    $scope.goToUserWall = function (username) {
        $location.path('/users/wall/' + username);
    };

    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
        $rootScope.title = currentRoute.title;
    });

    $scope.loginUser = function (loginData) {
        authorizationService.login(loginData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/users/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.registerUser = function (registerData) {
        authorizationService.register(registerData)
            .then(function (data) {
                authorizationService.setUserCredentials(data);
                $location.path('/users/feeds');
            }, function (error) {
                console.log(error);
            });
    };

    $scope.logoutUser = function () {
        authorizationService.logout()
            .then(function (data) {
                console.log(data);
                authorizationService.clearUserCredentials();
                authorizationService.clearUserTemporaryData();
                $location.path('/');
            }, function (err) {
                console.log(err);
            })
    };

    $scope.fillEditProfileData = function () {
        if ($location.path() === '/users/profile') {
            userService.getDataAboutMe()
                .then(function (data) {
                    $scope.profileData = data;
                }, function (err) {
                    console.log(err);
                });
        }
    };

    $scope.fileLoaded = function (ev) {
        var tgt = ev.target || window.event.srcElement,
            files = tgt.files;

        if (FileReader && files && files.length) {
            var fileReader = new FileReader();
            fileReader.onload = function () {

                $scope.loadedFile = fileReader.result;
                $scope.$apply();
            };
            fileReader.readAsDataURL(files[0]);
        } else {
            // Not supported
        }
    };

    $scope.editUserProfile = function (profileData) {
        userService.editProfile(profileData)
            .then(function (data) {
                console.log(data);
                $location.path('/users/feeds');
                $route.reload();
                authorizationService.clearUserTemporaryData();
            }, function (error) {
                console.log(error);
            })
    };
    
    $scope.changePassword = function (userData) {
        userService.changeUserPassword(userData)
            .then(function (data) {
                console.log(data);
                $location.path('/users/feeds');
                $route.reload();
            }, function (error) {
                console.log(error);
            })
    };

    $scope.getUserWall = function (username) {
        if (username) {
            authorizationService.getUserFullData(username)
                .then(function (userFullData) {
                    $scope.userWallData = userFullData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getFriendsFriendsPreview = function (username) {
        if (username) {
            authorizationService.getFriendsFriendsPreview(username)
                .then(function (friendsFriendsData) {
                    $scope.friendsFriends = friendsFriendsData.friends;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getWallsPost = function (username) {
        if (username) {
            authorizationService.getUserWallFeed(username)
                .then(function (wallFeedData) {
                    console.log(wallFeedData);
                    $scope.wallFeeds = wallFeedData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.addWallPost = function (postData) {
        postData['username'] = $routeParams.username;
        postService.addPost(postData)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (error) {
                console.log(error);
            });
    };

    $scope.searchByUsersFullName = function (substringOfFullname) {
        authorizationService.searchUsersByName(substringOfFullname)
            .then(function (userNamesData) {
                console.log(userNamesData);
                $scope.userNames = userNamesData;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.addCommentToPost = function (feed, commentContent) {
        commentService.addCommentToPost(feed, commentContent)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (error) {
                console.log(error);
            });
    };
    
    $scope.getCommentsByPostId = function (postId) {
        console.log(postId);
        commentService.getPostComments(postId)
            .then(function (allCommentsForPostData) {
                $scope.allCommentsForPost = allCommentsForPostData;
            }, function (error) {
                console.log(error);
            })
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

    $scope.likeComment = function (postId, commentId) {
        commentService.likeComment(postId, commentId)
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
    };

    $scope.dislikeComment = function (postId, commentId) {
        commentService.dislikeComment(postId, commentId)
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
    };

    // Function calls
    if (sessionStorage['username'] !== $routeParams.username) {
        $scope.getFriendsFriendsPreview($routeParams.username);
    }

    $scope.userDetails();
    $scope.fillEditProfileData();
    $scope.getUserWall($routeParams.username);
    $scope.getWallsPost($routeParams.username);

});