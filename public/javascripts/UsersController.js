
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

    $scope.remove = function (id, idx) {
        LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบ ใช่หรือไม่?', {
            ok: 'ใช่ ต้องการลบ',
            cancel: 'ไม่ต้องการลบ'
        }, function (res) {
            if (res) {
                // delete
                UsersService.remove(id)
                    .then(function (data) {
                        if (data.ok) {
                            //$scope.all();
                            $scope.users.splice(idx, 1);
                        } else {
                            console.log(data.msg);
                            LxNotificationService.error('Oop!');
                        }
                    }, function (err) {
                        LxNotificationService.error('Connection failed!');
                    });
            }
        });
    };

    $scope.all();

});
