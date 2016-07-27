(function (angular) {


    angular.module('messenger').config(bindRoutes);

    bindRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function bindRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('layout', {
                abstract: true,
                templateUrl: "./templates/layout.html"
            })
            .state('layout.dialogs', {
                url: "/",
                resolve: {
                    dialogsList: ['DialogsService', function (DialogsService) {
                        return DialogsService.getDialogs();
                    }]
                },
                controller: 'DialogsController',
                controllerAs: 'dialogs',
                templateUrl: "./templates/dialogs.html"
            })
            .state('layout.dialogs.dialog', {
                url: ":dialogId",
                resolve: {
                    dialog: ['DialogsService', '$stateParams', function (DialogsService, $stateParams) {
                        return DialogsService.getDialogById($stateParams.dialogId);
                    }]
                },
                controller: 'DialogController',
                controllerAs: 'dialog',
                templateUrl: "./templates/dialog.html"
            });


    }


})(window.angular);