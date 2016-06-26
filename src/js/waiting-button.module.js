const angular = require('angular');
import {WaitingButtonDirective} from './waiting-button.directive';
import {mbmWaitingButtonText} from './waiting-button-text.directive';


(function () {
  angular.module('mbm.waitingButton', [])
    .directive('mbmWaitingButton', () => new WaitingButtonDirective())
    .directive('mbmWaitingButtonText', mbmWaitingButtonText);
})();
