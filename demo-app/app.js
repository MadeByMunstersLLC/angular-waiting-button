
(function() {
  'use strict';

  angular.module('app', [
    'mbm.waitingButton'
  ]);

  angular.module('app').directive('demoContainer', () => {
    return {
      controller: ['$timeout', function($timeout) {
        var vm = this;

        vm.onClickWaitingButton = function onClickWaitingButton() {
          return $timeout(() => { return true; }, 3000, false);
        }
      }],
      controllerAs: 'ctrl$',
      template: `
        <button mbm-waiting-button="ctrl$.onClickWaitingButton()">Waiting Button</button>
      `
    };
  });
}());