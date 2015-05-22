'use strict';

socialNetwork.controller('userController', function ($scope, $location, $http, $rootScope, $route,
                                                     $routeParams, $interval, authorizationService,
                                                     userService, postService, commentService) {
    // Authorization token
    $http.defaults.headers.common['Authorization'] = sessionStorage['access_token'];

    var Paths = {
        feedPath : '/users/feeds',
        wallPath : '/users/wall/',
        profilePath : '/users/profile'
    };

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
                        $scope.hasPendingFriendRequest = data.hasPendingRequest;
                        sessionStorage['currentUsername'] = data.username;
                        sessionStorage['currentUserprofilepic'] = data.profileImageData;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    };

    $scope.goToMyWall = function (username) {
        $location.path(Paths.wallPath + username);
    };

    $scope.goToUserWall = function (username) {
        $location.path(Paths.wallPath + username);
    };

    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
        $rootScope.title = currentRoute.title;
    });

    $scope.fillEditProfileData = function () {
        if ($location.path() === Paths.profilePath) {
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
                $location.path(Paths.feedPath);
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
                $location.path(Paths.feedPath);
                $route.reload();
            }, function (error) {
                console.log(error);
            })
    };

    $scope.getUserWall = function (username) {
        if (username) {
            authorizationService.getUserFullData(username)
                .then(function (userFullData) {
                    $scope.isCurrentUserFriend = userFullData.isFriend;
                    $scope.userWallData = userFullData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getFriendsFriendsPreview = function (username) {
        if (username && $scope.isCurrentUserFriend) {
            authorizationService.getFriendsFriendsPreview(username)
                .then(function (friendsFriendsData) {
                    $scope.friendsFriends = friendsFriendsData.friends;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.getUserPendingFriendRequests = function () {
        if (authorizationService.isLoggedIn()) {
            authorizationService.getUserPreviewData()
                .then(function (data) {
                   $scope.hasPendingFriendRequest = data.hasPendingRequest;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    $scope.hideUserRequestContainer = function () {
        $scope.isPendingRequestHovered = false;
    };

    $scope.getFriendRequests = function () {
        if ($scope.hasPendingFriendRequest) {
            userService.getFriendRequests()
                .then(function (data) {
                    console.log(data);
                    $scope.pendingFriendRequestData = data;
                    $scope.isPendingRequestHovered = true;
                }, function (error) {
                    console.log(error);
                })
        }
    };

    $scope.acceptFriendRequest = function (request) {
        userService.approveFriendRequest(request.id)
            .then(function (data) {
                $route.reload();
            }, function (error) {
                console.log(error);
            });
    };

    $scope.declineFriendRequest = function (request) {
        userService.declineFriendRequest(request.id)
            .then(function (data) {
                $route.reload();
            }, function (error) {
                console.log(error);
            });
    };

    $scope.sendFriendRequest = function (request) {
        userService.sendFriendRequest(request.username)
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error); 
            });
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
                feed.comments.unshift(data);
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

    $scope.likeComment = function (post, comment) {
        commentService.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = data.liked;
                comment.likesCount = data.likesCount;
            }, function (error) {
                console.log(error);
            });
    };

    $scope.dislikeComment = function (post, comment) {
        commentService.dislikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = data.liked;
                comment.likesCount = data.likesCount;
            }, function (error) {
                console.log(error);
            });
    };

    $scope.previewUser = function (feed) {
        authorizationService.getUserPreviewDataByUsername(feed.author.username)
            .then(function (userData) {
                $scope.hoveredUserPreviewData = userData;
                $scope.isUserHovered = true;
                $scope.hoveredPostId = feed.id;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.stopUserPreview = function () {
        $scope.isUserHovered = false;
    };

    $scope.getNewsFeed = function () {
        if ($location.path() === Paths.feedPath && authorizationService.isLoggedIn()) {
            userService.getNewsFeed()
                .then(function (feedsData) {
                    console.log(feedsData);
                    $scope.newsFeeds = feedsData;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    // Function calls
    if (authorizationService.isLoggedIn()) {
        if (sessionStorage['username'] !== $routeParams.username) {
            $scope.getFriendsFriendsPreview($routeParams.username);
        }

        $scope.getNewsFeed();
        $scope.userDetails();
        $scope.fillEditProfileData();
        $scope.getUserWall($routeParams.username);
        $scope.getWallsPost($routeParams.username);
        $interval(function () {
            $scope.getUserPendingFriendRequests();
        }, 5000);

        // Add page auto-refresh
    }
});