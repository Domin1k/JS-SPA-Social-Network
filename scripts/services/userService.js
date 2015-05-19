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


    return serviceRequester;
});