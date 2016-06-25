const angular = require('angular'),
      angularMock = require('angular-mocks');


describe('mbmWaitingButton', () => {
  beforeEach(() => {
    angular.mock.module('mbm.waitingButton');
  });

  it('should compile this directive', () => {
    angular.mock.inject(($rootScope, $compile, $timeout) => {
      $rootScope.onClickReceiver = function() {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
        // return $timeout(() => {}, 0, false);
      }
      const template = `
        <button mbm-waiting-button="onClickReceiver()">Waiting Button</button>
      `;
      const element = $compile(template)($rootScope);

      console.log(`element:`, element[0]);
      element[0].click();
    });
  });
});
