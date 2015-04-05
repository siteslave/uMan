App.factory('ChartService', function ($q, $http) {
    return {
        all: function (id) {
            console.log(id);
            var q = $q.defer();

            $http({
                url: '/getchart',
                method: 'POST'
            })
            .success(function (data) {
                q.resolve(data);
            })
            .error(function (err) {
                q.reject(err);
            });

            return q.promise;
        }
    };
});
