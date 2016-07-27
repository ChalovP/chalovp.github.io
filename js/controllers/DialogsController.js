(function (angular) {

    angular.module('messenger').controller('DialogsController', DialogsController);

    DialogsController.$inject = ['$location', 'dialogsList', '$state'];

    function DialogsController($location, dialogsList, $state) {
        var dialogs = this;


        dialogs.list = dialogsList;


        dialogs.loadedDialog = false;


        dialogs.viewDialog = viewDialog;


        function viewDialog(dialogId) {
            if ($state.params.dialogId == dialogId) return;

            dialogs.loadedDialog = true;
            $location.path('/' + dialogId);
        }
    }

})(window.angular);