(function (angular) {

    angular.module('messenger').controller('DialogController', DialogController);

    DialogController.$inject = ['dialog', '$scope', 'DialogsService'];

    function DialogController(_dialog, $scope, DialogsService) {
        var dialog = this;

        dialog.dialog = _dialog;

        dialog.sendMessageForm = {
            text: ''
        };

        dialog.sendMessage = sendMessage;

        $scope.dialogs.loadedDialog = false;

        function sendMessage() {
            if ($scope.sendMessage.$pending) return;
            $scope.sendMessage.$pending = true;

            var last_msg = dialog.dialog.parts[dialog.dialog.parts.length - 1],
                msg = {
                    text: dialog.sendMessageForm.text,
                    id: last_msg ? last_msg.id + 1 : 1,
                    author: 'authorName'
                };

            DialogsService.sendMessage(dialog.dialog.id, msg).then(function () {
                $scope.sendMessage.$pending = false;
                dialog.sendMessagePending = false;
                dialog.sendMessageForm.text = '';
                dialog.dialog.parts.push(msg);
            });

        }
    }
})(window.angular);