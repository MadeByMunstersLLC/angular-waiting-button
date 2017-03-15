import {WaitingButtonController} from '../src/js/waiting-button.directive';
import mbmWaitingButton from '../src/js/waiting-button.module';

describe('mbmWaitingButton', () => {
  beforeEach(() => {
    angular.mock.module('mbmWaitingButton');
  });

  it('should toggle waiting class based on operation promise', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      const operationDeferred = $q.defer();

      // Fake receiver for the click action
      $rootScope.onClickReceiver = function() {
        return operationDeferred.promise;
      }

      // Define simple template for the directive, and then compile it
      const template = `
        <button mbm-waiting-button="onClickReceiver()">Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      // Verify that the element doesn't have the waiting-button loading class
      //  by default.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);

      // Simulate click to enter "waiting" state
      element[0].click();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element now has the waiting-button loading class.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(true);

      // Resolve the operation. Should return waiting button to normal state.
      operationDeferred.resolve();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element doesn't have the waiting-button loading class
      //  after the operation promise has resolved.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);
    });
  });

  it('should support customizable waiting classes', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      const operationDeferred = $q.defer();

      // Fake receiver for the click action
      $rootScope.onClickReceiver = function() {
        return operationDeferred.promise;
      }

      // Define the custom CSS class we'll be testing for
      const waitingClass = 'waiting';

      // Define simple template for the directive, and then compile it
      const template = `
        <button
          mbm-waiting-button="onClickReceiver()"
          waiting-button-waiting-class="${waitingClass}"
          >Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      // Verify that the element doesn't have the waiting-button loading class
      //  by default.
      expect(element.hasClass(waitingClass)).toEqual(false);

      // Simulate click to enter "waiting" state
      element[0].click();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element now has the waiting-button loading class.
      expect(element.hasClass(waitingClass)).toEqual(true);

      // Resolve the operation. Should return waiting button to normal state.
      operationDeferred.resolve();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element doesn't have the waiting-button loading class
      //  after the operation promise has resolved.
      expect(element.hasClass(waitingClass)).toEqual(false);
    });
  });

  it('should support prevent additional action triggers while in wait state', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      const operationDeferred = $q.defer();

      // Fake receiver for the click action
      let receiverInvocationCounter = 0;
      $rootScope.onClickReceiver = function() {
        // TODO: This should updated to use a spy at some point.
        receiverInvocationCounter++;

        return operationDeferred.promise;
      }

      // Define simple template for the directive, and then compile it
      const template = `
        <button mbm-waiting-button="onClickReceiver()">Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      // Simulate click to enter "waiting" state
      element[0].click();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Simulate another click
      element[0].click();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the operation receiver has only been invoked once.
      expect(receiverInvocationCounter).toEqual(1);
    });
  });

  it('should support remove waiting presentation after error', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      const operationDeferred = $q.defer();

      // Fake receiver for the click action
      $rootScope.onClickReceiver = function() {
        return operationDeferred.promise;
      }

      // Define simple template for the directive, and then compile it
      const template = `
        <button mbm-waiting-button="onClickReceiver()">Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      // Verify that the element doesn't have the waiting-button loading class
      //  by default.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);

      // Simulate click to enter "waiting" state
      element[0].click();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element now has the waiting-button loading class.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(true);

      // Reject (fail) the operation. Should move the waiting button to
      //  error state.
      operationDeferred.reject();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element doesn't have the waiting-button loading class
      //  after the operation promise has resolved.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);
    });
  });

  it('should support sequential success operations', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      let operationDeferred = $q.defer();

      // Fake receiver for the click action
      $rootScope.onClickReceiver = function() {
        return operationDeferred.promise;
      }

      // Define simple template for the directive, and then compile it
      const template = `
        <button mbm-waiting-button="onClickReceiver()">Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      // Run the click test once
      successClickTest();

      // Reset the operation promise
      operationDeferred = $q.defer();

      // Run the click test again
      successClickTest();

      function successClickTest() {
        // Verify that the element doesn't have the waiting-button loading class
        //  by default.
        expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);

        // Simulate click to enter "waiting" state
        element[0].click();

        // Run the Angular digest loop once to pick up the changes.
        $rootScope.$digest();

        // Verify that the element now has the waiting-button loading class.
        expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(true);

        // Resolve the operation. Should return waiting button to normal state.
        operationDeferred.resolve();

        // Run the Angular digest loop once to pick up the changes.
        $rootScope.$digest();

        // Verify that the element doesn't have the waiting-button loading class
        //  after the operation promise has resolved.
        expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);
      }
    });
  });
});
