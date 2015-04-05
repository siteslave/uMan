App.factory('UsersEditService', function ($q, $http) {

    return {
        edit: function (id) {
            console.log(id);
            var q = $q.defer();

            $http({
                url: '/edit',
                method: 'POST',
                data: { id: id }
            })
            .success(function (data) {
                q.resolve(data);
            })
            .error(function (err) {
                q.reject(err);
            });

            return q.promise;
        },

        saveEdit: function (id, fullname, active) {

            var q = $q.defer();

            $http({
                url: '/save_edit',
                method: 'POST',
                data: {
                    id: id,
                    fullname: fullname,
                    active: active
                }
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
