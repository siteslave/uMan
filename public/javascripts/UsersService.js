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

        },

        remove: function (id) {
            var q = $q.defer();

            $http({
                url: '/delete',
                method: 'POST',
                data: { id: id }
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
