App.controller('LoginController', function ($scope, $window, LoginService, LxNotificationService) {

    $scope.doLogin = function () {
        var username = $scope.username;
        var password = $scope.password;

        LoginService.doLogin(username, password)
            .then(function (data) {
                if (data.ok) {
                    $window.location.href = '/';
                } else {
                    LxNotificationService.error('ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง');
                }
            }, function (err) {
                console.log(err);
            });
        
    };

});

