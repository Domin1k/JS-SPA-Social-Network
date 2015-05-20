'use strict';

socialNetwork.factory('userService', function (BASE_URL, mainRequesterService) {
    var serviceUrl = BASE_URL + '/me';
    var serviceRequester = {};

    serviceRequester.editProfile = function (newData) {
        var profileData = {
            "name": newData.name,
            "email": newData.email,
            "gender": newData.gender,
            "profileImageData": newData.profileImageData,
            "coverImageData": newData.coverImageData
        };

        return mainRequesterService.putRequest(serviceUrl, profileData);
    };
    
    serviceRequester.getDataAboutMe = function () {
        return mainRequesterService.getRequest(serviceUrl, {});
    };
    
    serviceRequester.changeUserPassword = function (userData) {
        var newUserPassword = {
            "oldPassword": userData.oldPassword,
            "newPassword": userData.newPassword,
            "confirmPassword": userData.confirmPassword
        };

        return mainRequesterService.putRequest(serviceUrl + '/ChangePassword', newUserPassword);
    };
    
    serviceRequester.getOwnFriends = function () {
        return mainRequesterService.getRequest(serviceUrl + '/friends', {});
    };

    //serviceRequester.getWallsPost = function () {
    //    return mainRequesterService.getRequest(serviceUrl + '/feed?StartPostId=&PageSize=5', {});
    //};

    return serviceRequester;
});