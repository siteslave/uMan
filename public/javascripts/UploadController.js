App.controller('UploadController', function ($scope, LxProgressService) {
    $scope.submit = function () {
        LxProgressService.circular.show('#5fa2db', '#progress');
        return true;
    };

    $scope.complete = function(content) {
        LxProgressService.circular.hide();
      console.log(content); // process content
    }
});
