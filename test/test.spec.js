import {testFunction} from './test.import';
const angular = require('angular'),
      angularMock = require('angular-mocks');


describe('Test component', () => {
  beforeEach(() => {
    angular.mock.module('mbm.waitingButton');
  });

  it('has a dummy test', () => {
    const result = testFunction();

    expect(result).toEqual(42);
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
