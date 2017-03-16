import { WaitingButtonDirective } from "./waiting-button.directive";
import { mbmWaitingButtonText } from "./waiting-button-text.directive";
import "../sass/angular-waiting-button.scss";

export default angular
  .module("mbmWaitingButton", [])
  .directive("mbmWaitingButton", () => new WaitingButtonDirective())
  .directive("mbmWaitingButtonText", mbmWaitingButtonText).name;
