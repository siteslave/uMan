App.controller('UsersEditController', function ($scope, $routeParams, $location, UsersEditService) {

    $scope.id = $routeParams.id;

    UsersEditService.edit($scope.id)
        .then(function (data) {

            $scope.username = data.users.username;
            $scope.fullname = data.users.fullname;
            $scope.active = data.users.active == 'Y' ? true : false;
        }, function (err) {
            console.log(err);
        });


    $scope.save = function () {
        var active = $scope.active ? 'Y' : 'N';

        UsersEditService.saveEdit($scope.id, $scope.fullname, active)
            .then(function () {
                $location.path('/');
            }, function (err) {
                console.log(err);
            });
    };

});
