App.config(function ($routeProvider) {

    $routeProvider
        .when('/', { // #/
            templateUrl: '/partials/main',
            controller: 'UsersController'
        })
        .when('/new', { // #/new
            templateUrl: '/partials/new',
            controller: 'UsersNewController'
        })
        .when('/edit/:id', {
            templateUrl: '/partials/edit',
            controller: 'UsersEditController'
        })
        .otherwise({ redirectTo: '/' });

});
