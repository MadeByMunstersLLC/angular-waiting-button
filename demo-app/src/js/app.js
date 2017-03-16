import angular from 'angular';
import mbmWaitingButton from "angular-waiting-button";
import "../sass/styles.scss";

angular.module("app", [mbmWaitingButton]).directive('demoContainer', () => {
  return {
    controller: ['$timeout', function($timeout) {
      var vm = this;

      vm.onClickWaitingButton = function onClickWaitingButton() {
        return $timeout(() => { return true; }, 3000, false);
      }
    }],
    controllerAs: '$ctrl',
    template: `
      <button mbm-waiting-button="$ctrl.onClickWaitingButton()">Waiting Button</button>
    `
  };
});