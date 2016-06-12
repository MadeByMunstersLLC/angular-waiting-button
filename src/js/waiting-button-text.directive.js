
export function mbmWaitingButtonText() {
  return {
    restrict: 'EA',
    require: '^mbmWaitingButton',
    scope: {
      statusCategory: '@waitingButtonText'
    },
    link: function ($scope, element, attr, waitingButtonCtrl) {
      waitingButtonCtrl.registerText(onChangeStatus);

      var states = $scope.statusCategory.split(',').map(function(state) { return state.trim(); });

      function onChangeStatus(newStatus) {
        if (states.indexOf(newStatus) >= 0) {
          element.show();
        } else {
          element.hide();
        }
      }

      onChangeStatus(waitingButtonCtrl.getState());
    }
  };
}
