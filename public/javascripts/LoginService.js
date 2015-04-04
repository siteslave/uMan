
App.factory('LoginService', function ($q, $http) {

    return {
        doLogin: function (username, password) {
            var q = $q.defer();

            $http({
                url: '/login/dologin',
                method: 'POST',
                data: { //params: { username: username, password: password }
                    username: username,
                    password: password
                }
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