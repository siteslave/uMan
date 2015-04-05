App.factory('UsersNewService', function ($q, $http) {

    return {
        save: function (user) {

            var q = $q.defer();
            
            $http({
                url: '/save',
                method: 'POST',
                data: { user: user }
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
