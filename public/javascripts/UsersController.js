
App.controller('UsersController', function ($scope, UsersService, LxNotificationService) {

    $scope.all = function () {

        UsersService.all()
            .then(function (data) {
                if (data.ok) {
                    $scope.users = data.rows;
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('Oop!');
                }
            }, function (err) {
                LxNotificationService.error('Connection failed!');
            });

    };

    $scope.all();

});
