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
      <h3>Basic Button</h3>
      <button mbm-waiting-button="$ctrl.onClickWaitingButton()">Waiting Button</button>
      <h3>State-based Text</h3>
      <button mbm-waiting-button="$ctrl.onClickWaitingButton()">
        <span mbm-waiting-button-text waiting-button-state="init">Init</span>
        <span mbm-waiting-button-text waiting-button-state="wait">Waiting...</span>
        <span mbm-waiting-button-text waiting-button-state="success">Success</span>
        <span mbm-waiting-button-text waiting-button-state="error">Error</span>
      </button>
    `
  };
});
