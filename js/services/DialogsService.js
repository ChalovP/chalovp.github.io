(function (angular) {

    var BIN_ID = '3xohz';

    angular.module('messenger').factory('DialogsService', DialogsService);

    DialogsService.$inject = ['$http', '$q'];

    function DialogsService($http, $q) {
        return ({
            getDialogs: getDialogs,
            getDialogById: getDialogById,
            sendMessage: sendMessage
        });


        function getDialogs() {
            return $http.get('https://api.myjson.com/bins/' + BIN_ID).then(function (result) {
                return result.data;
            })
        }

        function getDialogById(dialogId) {

            return getDialogs().then(function (dialogs) {
                for (var i = 0; i < dialogs.length; i++) {
                    if (dialogs[i].id == dialogId) return dialogs[i];
                }
                return $q.reject('Dialog not found');
            });

        }


        function sendMessage(dialogId, msg) {

            return getDialogs().then(function (dialogs) {
                for (var i = 0; i < dialogs.length; i++) {
                    if (dialogs[i].id !== dialogId) continue;
                    dialogs[i].parts.push(msg);
                }
                return $http.put('https://api.myjson.com/bins/' + BIN_ID, dialogs);
            });

        }


    }
})(window.angular);