import {WaitingButtonController} from '../src/js/waiting-button.directive';
const angular = require('angular'),
      angularMock = require('angular-mocks');


describe('mbmWaitingButton', () => {
  beforeEach(() => {
    angular.mock.module('mbm.waitingButton');
  });

  it('should toggle waiting class based on operation promise', () => {
    angular.mock.inject(($rootScope, $compile, $timeout, $q) => {
      // Build a Promise to represent an async operation
      const operationDeferred = $q.defer();

      // TODO: Maybe should use $q here?
      const operationPromise = new Promise((resolve, reject) => {});

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

      // Verify that the element now has the waiting-button loading class.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(true);

      // TODO: this functionality has yet to be implemented.
      // expect(element.prop('disabled')).toEqual(true);

      // Resolve the operation. Should return waiting button to normal state.
      operationDeferred.resolve();

      // Run the Angular digest loop once to pick up the changes.
      $rootScope.$digest();

      // Verify that the element doesn't have the waiting-button loading class
      //  after the operation promise has resolved.
      expect(element.hasClass(WaitingButtonController.WAITING_CLASS)).toEqual(false);
    });
  });
});
