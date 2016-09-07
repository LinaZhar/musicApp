(function () {
    'use strict';

    angular
        .module('app')
        .config(configureState);

    configureState.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function configureState($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('root', {
                url: '/',
                abstract: false,
                views: {
                    '@': {
                        templateUrl: 'songsList/songsList.html',
                        controller: 'SongsListController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise("/");
    }
})();