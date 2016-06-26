
export class WaitingButtonDirective {
  constructor() {
    this.restrict = 'A';
    this.require = 'mbmWaitingButton';
    this.scope = {
      actionReceiver: '&mbmWaitingButton',
      isExternalEnabled: '=?waitingButtonEnabled',
      waitingClass: '@?waitingButtonWaitingClass',
    };
    this.controller = ['$scope', WaitingButtonController];
    this.link = WaitingButtonDirective.link;
  }

  static link($scope, element, attr, waitingButtonCtrl) {
    var isWaiting = false;

    // Start with the default waiting class
    var waitingClass = WaitingButtonController.WAITING_CLASS;

    if (typeof $scope.waitingClass === 'string') {
      // Override the default if a custom waiting class has been provided.
      waitingClass = $scope.waitingClass;
    }

    if (typeof $scope.isExternalEnabled === 'undefined') {
      // No value provided for external button enabled attribute; assume
      // button is always considered externally enabled.
      $scope.isExternalEnabled = true;
    }

    $scope.isEnabled = function isEnabled() {
      return $scope.isExternalEnabled && !isWaiting;
    }

    $scope.$watch('isEnabled()', function(value) {
      element.toggleClass('disabled', !value);
    });

    element.on('click touchstart', function(event) {
      if (event) { event.preventDefault(); }

      // Do nothing if the button isn't enabled.
      if (!$scope.isEnabled()) { return; }

      // Execute the action, and capture the (expected) returned promise.
      var actionQ = $scope.actionReceiver();

      // Add waiting style.
      element.addClass(waitingClass);

      // Set waiting flag, and apply scope to update isEnabled watch.
      isWaiting = true;
      $scope.$apply();

      waitingButtonCtrl.updateState('wait');

      actionQ
        .then(function() {
          waitingButtonCtrl.updateState('success');

          clearWaiting();
        })
        .catch(function() {
          waitingButtonCtrl.updateState('error');

          clearWaiting();
        });
    });

    function clearWaiting() {
      // Clear the waiting style and flag.
      isWaiting = false;
      element.removeClass(waitingClass);
    }
  }
}

export class WaitingButtonController {
  constructor($scope) {
    var vm = this,
        registeredTexts = [],
        currentState = 'init';

    vm.registerText = function registerText(waitingButtonTextListener) {
      registeredTexts.push(waitingButtonTextListener);
    };

    vm.updateState = function updateState(newState) {
      currentState = newState;

      notifyStateChange(currentState);
    };

    vm.getState = function getState() {
      return currentState;
    };

    function notifyStateChange(newState) {
      registeredTexts.forEach(function(waitingButtonTextListener) {
        waitingButtonTextListener(newState);
      });
    }
  }
}
WaitingButtonController.WAITING_CLASS = 'mbm-waiting-button--waiting';
