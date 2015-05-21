'use strict';

socialNetwork.factory('commentService', function (BASE_URL, mainRequesterService) {
    var serviceUrl = BASE_URL + '/posts/';
    var serviceRequester = {};
    
    serviceRequester.addCommentToPost = function (feed, commentContent) {
        var postId = feed.id;
        var comment = {
            "commentContent": commentContent
        };

        return mainRequesterService.postRequest(serviceUrl + postId + '/comments', comment);
    };

    serviceRequester.getPostComments = function (postId) {
        return mainRequesterService.getRequest(serviceUrl + postId + '/comments', {});
    };

    return serviceRequester;    
});