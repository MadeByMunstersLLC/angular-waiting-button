export function mbmWaitingButtonText() {
  return {
    restrict: "EA",
    require: "^mbmWaitingButton",
    scope: {
      statusCategory: "@waitingButtonState"
    },
    link: function($scope, element, attr, waitingButtonCtrl) {
      // Pull the element out of its array; get the raw DOMElement object.
      const unwrappedElmnt = element[0];
      let displayValue = unwrappedElmnt.style.display;

      waitingButtonCtrl.addStateChangeListener(onChangeStatus);

      var states = $scope.statusCategory.split(",").map(function(state) {
        return state.trim();
      });

      function onChangeStatus(newStatus) {
        if (states.indexOf(newStatus) >= 0) {
          unwrappedElmnt.style.display = displayValue;
        } else {
          // Attempt to capture updated display value, unless current display
          // value is already "none" (element is already hidden)
          displayValue = unwrappedElmnt.style.display !== 'none' ?  unwrappedElmnt.style.display : displayValue;

          unwrappedElmnt.style.display = "none";
        }
      }

      onChangeStatus(waitingButtonCtrl.getState());
    }
  };
}
