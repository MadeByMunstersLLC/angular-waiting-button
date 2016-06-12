import {mbmWaitingButton} from './waiting-button.directive';
import {mbmWaitingButtonText} from './waiting-button-text.directive';


(function () {
  angular.module('mbm.waitingButton', [])
    .directive('mbmWaitingButton', mbmWaitingButton)
    .directive('mbmWaitingButtonText', mbmWaitingButtonText);
})();
