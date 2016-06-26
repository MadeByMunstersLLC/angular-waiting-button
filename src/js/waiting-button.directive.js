
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
    this.controllerAs = 'ctrl$';
    this.link = WaitingButtonDirective.link;
  }

  static link($scope, element, attr, waitingButtonCtrl) {
    var isWaiting = false;

    // Start with the default waiting class
    var waitingClass = determineWaitingClass();

    if (typeof $scope.isExternalEnabled === 'undefined') {
      // No value provided for external button enabled attribute; assume
      // button is always considered externally enabled.
      $scope.isExternalEnabled = true;
    }

    $scope.isEnabled = function isEnabled() {
      return $scope.isExternalEnabled && !isWaiting;
    }

    $scope.$watch('ctrl$.getState()', function(newState) {
      updateElementState(newState);
    });

    // Pick up initial state
    updateElementState($scope.ctrl$.getState());

    $scope.$watch('isEnabled()', function(value) {
      element.toggleClass('disabled', !value);
    });

    element.on('click touchstart', onClickHandler);

    function updateElementState(newState) {
      switch (newState) {
        case 'init':
          onStateInit();
          break;
        case 'wait':
          onStateWait();
          break;
        case 'error':
          onStateError();
          break;
        case 'success':
          onStateSuccess();
          break;
        default:
          // Should never get here; blow up if the state can't be parsed.
          throw new Error('Unrecognized state');
      }
    }

    function onStateInit() {
      clearWaiting();
    }

    function onStateWait() {
      // Add waiting style.
      element.addClass(waitingClass);
    }

    function onStateError() {
      clearWaiting();
    }

    function onStateSuccess() {
      clearWaiting();
    }

    function onClickHandler(event) {
      if (event) { event.preventDefault(); }

      $scope.ctrl$.startAction();
    }

    function determineWaitingClass() {
      let styleClass = WaitingButtonController.WAITING_CLASS;

      if (typeof $scope.waitingClass === 'string') {
        // Override the default if a custom waiting class has been provided.
        styleClass = $scope.waitingClass;
      }

      return styleClass;
    }

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

    vm.startAction = function startAction() {
      if (vm.getState() === 'wait') {
        // Action already in progress, ignore action request.
        return;
      }

      // Execute the action, and capture the (expected) returned promise.
      var actionQ = $scope.actionReceiver();

      vm.updateState('wait');

      actionQ
      .then(function() {
        vm.updateState('success');
      })
      .catch(function() {
        vm.updateState('error');
      });
    }

    vm.updateState('init');

    function notifyStateChange(newState) {
      registeredTexts.forEach(function(waitingButtonTextListener) {
        waitingButtonTextListener(newState);
      });
    }
  }
}
WaitingButtonController.WAITING_CLASS = 'mbm-waiting-button--waiting';
