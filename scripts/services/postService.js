'use strict';

socialNetwork.factory('postService', function (BASE_URL, mainRequesterService) {
    var serviceUrl = BASE_URL + '/posts';
    var serviceRequester = {};

    serviceRequester.addPost = function (postRawData) {
        var post = {
            "postContent":postRawData.postContent ,
            "username":postRawData.username
        };
        return mainRequesterService.postRequest(serviceUrl, post);
    };



    return serviceRequester;
});