App.controller('UploadController', function ($scope, LxProgressService, LxNotificationService) {
    $scope.submit = function () {
        LxProgressService.circular.show('#5fa2db', '#progress');
        return true;
    };

    $scope.complete = function(content) {
        LxNotificationService.success('Upload file success');
        LxProgressService.circular.hide();
      console.log(content); // process content
    }
});
