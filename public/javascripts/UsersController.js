
App.controller('UsersController', function ($scope, UsersService, UsersNewService,
    LxNotificationService, LxDialogService, LxProgressService) {

    $scope.all = function () {

        LxProgressService.linear.show('#5fa2db', '#progress');

        UsersService.all()
            .then(function (data) {
                if (data.ok) {
                    $scope.users = data.rows;
                    LxProgressService.linear.hide();
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('Oop!');
                    LxProgressService.linear.hide();
                }
            }, function (err) {
                LxNotificationService.error('Connection failed!');
                LxProgressService.linear.hide();
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


    $scope.showModal = function () {
        LxDialogService.open('mdlNew');
    };

    $scope.save = function () {

        var user = {};
        user.fullname = $scope.fullname;
        user.username = $scope.username;
        user.password = $scope.password;
        user.active = $scope.active ? 'Y' : 'N';

        UsersNewService.save(user)
            .then(function (data) {
                if (data.ok) {
                    LxDialogService.close('mdlNew');
                    $scope.all();
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

    $scope.closingDialog = function () {
        $scope.username = null;
        $scope.password = null;
        $scope.fullname = null;
        $scope.active = false;
    };

    $scope.all();

});
