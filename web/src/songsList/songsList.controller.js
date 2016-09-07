(function () {
    'use strict';

    angular
        .module('app')
        .controller('SongsListController', SongsListController);

    SongsListController.inject = [];

    function SongsListController() {
        var vm = this;
    }
})();