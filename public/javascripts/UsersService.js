App.factory('UsersService', function ($q, $http) {

    return {
        all: function () {

            var q = $q.defer();

            $http({
                url: '/all',
                method: 'GET',
                data: {}
            })
            .success(function (data) {
                q.resolve(data);
            })
            .error(function (data, status) {
                q.reject(status);
            });

            return q.promise;

        }
    };

});
