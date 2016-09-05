(function () {
    'use strict';

    angular
        .module('app')
        .config(configureState);

    configureState.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configureState($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'web/src/songsList/songsList.html',
                        controller: 'SongsListController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise("/");
    }
})();