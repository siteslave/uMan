App.controller('UsersNewController', function ($scope, $location, UsersNewService, LxNotificationService) {
    $scope.save = function () {
        var user = {};
        user.fullname = $scope.fullname;
        user.username = $scope.username;
        user.password = $scope.password;
        user.active = $scope.active ? 'Y' : 'N';

        UsersNewService.save(user)
            .then(function (data) {
                if (data.ok) {
                    $location.path('/');
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('Oop!');
                }
            }, function (err) {
                console.log(data.msg);
                LxNotificationService.error('Connection failed');
            });
    };
});
