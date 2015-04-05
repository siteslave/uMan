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
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('Oop!');
                    } else {
                        LxNotificationService.error(data.msg);
                    }

                }
            }, function (err) {
                console.log(err);
                LxNotificationService.error('Connection failed');
            });
    };
});
