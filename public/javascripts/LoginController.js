App.controller('LoginController', function ($scope, $window, LoginService, LxNotificationService) {

    $scope.doLogin = function () {

        LoginService.doLogin($scope.username, $scope.password)
            .then(function (data) {
                if (data.ok) {
                    $window.location.href = '/';
                } else {
                    LxNotificationService.error('ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง');
                }
            }, function (err) {
                LxNotificationService.error('Oop!');
                console.log(err);
            });
        
    };

});
