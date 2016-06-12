(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mbmWaitingButtonText = mbmWaitingButtonText;
function mbmWaitingButtonText() {
  return {
    restrict: 'EA',
    require: '^mbmWaitingButton',
    scope: {
      statusCategory: '@waitingButtonText'
    },
    link: function link($scope, element, attr, waitingButtonCtrl) {
      waitingButtonCtrl.registerText(onChangeStatus);

      var states = $scope.statusCategory.split(',').map(function (state) {
        return state.trim();
      });

      function onChangeStatus(newStatus) {
        if (states.indexOf(newStatus) >= 0) {
          element.show();
        } else {
          element.hide();
        }
      }

      onChangeStatus(waitingButtonCtrl.getState());
    }
  };
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mbmWaitingButton = mbmWaitingButton;
function mbmWaitingButton() {
  return {
    restrict: 'A',
    require: 'mbmWaitingButton',
    scope: {
      actionReceiver: '&mbmWaitingButton',
      isExternalEnabled: '=?waitingButtonEnabled',
      waitingClass: '@?waitingButtonWaitingClass'
    },
    controller: ['$scope', function ($scope) {
      var vm = this,
          registeredTexts = [],
          currentState = 'init';

      vm.registerText = function registerText(waitingButtonTextListener) {
        registeredTexts.push(waitingButtonTextListener);
      };

      vm.updateState = function updateState(newState) {
        currentState = newState;

        notifyStateChange(currentState);
      };

      vm.getState = function getState() {
        return currentState;
      };

      function notifyStateChange(newState) {
        registeredTexts.forEach(function (waitingButtonTextListener) {
          waitingButtonTextListener(newState);
        });
      }
    }],
    link: function link($scope, element, attr, waitingButtonCtrl) {
      var isWaiting = false;

      // Start with the default waiting class
      var waitingClass = 'mbm-waiting-button--waiting';

      if (typeof $scope.waitingClass === 'string') {
        // Override the default if a custom waiting class has been provided.
        waitingClass = $scope.waitingClass;
      }

      if (typeof $scope.isExternalEnabled === 'undefined') {
        // No value provided for external button enabled attribute; assume
        // button is always considered externally enabled.
        $scope.isExternalEnabled = true;
      }

      $scope.isEnabled = function isEnabled() {
        return $scope.isExternalEnabled && !isWaiting;
      };

      $scope.$watch('isEnabled()', function (value) {
        element.toggleClass('disabled', !value);
      });

      element.on('click touchstart', function (event) {
        if (event) {
          event.preventDefault();
        }

        // Do nothing if the button isn't enabled.
        if (!$scope.isEnabled()) {
          return;
        }

        // Execute the action, and capture the (expected) returned promise.
        var actionQ = $scope.actionReceiver();

        // Add waiting style.
        element.addClass(waitingClass);

        // Set waiting flag, and apply scope to update isEnabled watch.
        isWaiting = true;
        $scope.$apply();

        waitingButtonCtrl.updateState('wait');

        actionQ.then(function () {
          waitingButtonCtrl.updateState('success');
        }).catch(function () {
          waitingButtonCtrl.updateState('error');
        }).finally(function () {
          // Clear the waiting style and flag.
          isWaiting = false;
          element.removeClass(waitingClass);
        });
      });
    }
  };
}

},{}],3:[function(require,module,exports){
'use strict';

var _waitingButton = require('./waiting-button.directive');

var _waitingButtonText = require('./waiting-button-text.directive');

(function () {
  angular.module('mbm.waitingButton', []).directive('mbmWaitingButton', _waitingButton.mbmWaitingButton).directive('mbmWaitingButtonText', _waitingButtonText.mbmWaitingButtonText);
})();

},{"./waiting-button-text.directive":1,"./waiting-button.directive":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvd2FpdGluZy1idXR0b24tdGV4dC5kaXJlY3RpdmUuanMiLCJzcmMvanMvd2FpdGluZy1idXR0b24uZGlyZWN0aXZlLmpzIiwic3JjL2pzL3dhaXRpbmctYnV0dG9uLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQ2dCLG9CLEdBQUEsb0I7QUFBVCxTQUFTLG9CQUFULEdBQWdDO0FBQ3JDLFNBQU87QUFDTCxjQUFVLElBREw7QUFFTCxhQUFTLG1CQUZKO0FBR0wsV0FBTztBQUNMLHNCQUFnQjtBQURYLEtBSEY7QUFNTCxVQUFNLGNBQVUsTUFBVixFQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQyxpQkFBakMsRUFBb0Q7QUFDeEQsd0JBQWtCLFlBQWxCLENBQStCLGNBQS9COztBQUVBLFVBQUksU0FBUyxPQUFPLGNBQVAsQ0FBc0IsS0FBdEIsQ0FBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBcUMsVUFBUyxLQUFULEVBQWdCO0FBQUUsZUFBTyxNQUFNLElBQU4sRUFBUDtBQUFzQixPQUE3RSxDQUFiOztBQUVBLGVBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQztBQUNqQyxZQUFJLE9BQU8sT0FBUCxDQUFlLFNBQWYsS0FBNkIsQ0FBakMsRUFBb0M7QUFDbEMsa0JBQVEsSUFBUjtBQUNELFNBRkQsTUFFTztBQUNMLGtCQUFRLElBQVI7QUFDRDtBQUNGOztBQUVELHFCQUFlLGtCQUFrQixRQUFsQixFQUFmO0FBQ0Q7QUFwQkksR0FBUDtBQXNCRDs7Ozs7Ozs7UUN2QmUsZ0IsR0FBQSxnQjtBQUFULFNBQVMsZ0JBQVQsR0FBNEI7QUFDakMsU0FBTztBQUNMLGNBQVUsR0FETDtBQUVMLGFBQVMsa0JBRko7QUFHTCxXQUFPO0FBQ0wsc0JBQWdCLG1CQURYO0FBRUwseUJBQW1CLHdCQUZkO0FBR0wsb0JBQWM7QUFIVCxLQUhGO0FBUUwsZ0JBQVksQ0FBQyxRQUFELEVBQVcsVUFBUyxNQUFULEVBQWlCO0FBQ3RDLFVBQUksS0FBSyxJQUFUO1VBQ0ksa0JBQWtCLEVBRHRCO1VBRUksZUFBZSxNQUZuQjs7QUFJQSxTQUFHLFlBQUgsR0FBa0IsU0FBUyxZQUFULENBQXNCLHlCQUF0QixFQUFpRDtBQUNqRSx3QkFBZ0IsSUFBaEIsQ0FBcUIseUJBQXJCO0FBQ0QsT0FGRDs7QUFJQSxTQUFHLFdBQUgsR0FBaUIsU0FBUyxXQUFULENBQXFCLFFBQXJCLEVBQStCO0FBQzlDLHVCQUFlLFFBQWY7O0FBRUEsMEJBQWtCLFlBQWxCO0FBQ0QsT0FKRDs7QUFNQSxTQUFHLFFBQUgsR0FBYyxTQUFTLFFBQVQsR0FBb0I7QUFDaEMsZUFBTyxZQUFQO0FBQ0QsT0FGRDs7QUFJQSxlQUFTLGlCQUFULENBQTJCLFFBQTNCLEVBQXFDO0FBQ25DLHdCQUFnQixPQUFoQixDQUF3QixVQUFTLHlCQUFULEVBQW9DO0FBQzFELG9DQUEwQixRQUExQjtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBeEJXLENBUlA7QUFpQ0wsVUFBTSxjQUFVLE1BQVYsRUFBa0IsT0FBbEIsRUFBMkIsSUFBM0IsRUFBaUMsaUJBQWpDLEVBQW9EO0FBQ3hELFVBQUksWUFBWSxLQUFoQjs7O0FBR0EsVUFBSSxlQUFlLDZCQUFuQjs7QUFFQSxVQUFJLE9BQU8sT0FBTyxZQUFkLEtBQStCLFFBQW5DLEVBQTZDOztBQUUzQyx1QkFBZSxPQUFPLFlBQXRCO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPLE9BQU8saUJBQWQsS0FBb0MsV0FBeEMsRUFBcUQ7OztBQUduRCxlQUFPLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0Q7O0FBRUQsYUFBTyxTQUFQLEdBQW1CLFNBQVMsU0FBVCxHQUFxQjtBQUN0QyxlQUFPLE9BQU8saUJBQVAsSUFBNEIsQ0FBQyxTQUFwQztBQUNELE9BRkQ7O0FBSUEsYUFBTyxNQUFQLENBQWMsYUFBZCxFQUE2QixVQUFTLEtBQVQsRUFBZ0I7QUFDM0MsZ0JBQVEsV0FBUixDQUFvQixVQUFwQixFQUFnQyxDQUFDLEtBQWpDO0FBQ0QsT0FGRDs7QUFJQSxjQUFRLEVBQVIsQ0FBVyxrQkFBWCxFQUErQixVQUFTLEtBQVQsRUFBZ0I7QUFDN0MsWUFBSSxLQUFKLEVBQVc7QUFBRSxnQkFBTSxjQUFOO0FBQXlCOzs7QUFHdEMsWUFBSSxDQUFDLE9BQU8sU0FBUCxFQUFMLEVBQXlCO0FBQUU7QUFBUzs7O0FBR3BDLFlBQUksVUFBVSxPQUFPLGNBQVAsRUFBZDs7O0FBR0EsZ0JBQVEsUUFBUixDQUFpQixZQUFqQjs7O0FBR0Esb0JBQVksSUFBWjtBQUNBLGVBQU8sTUFBUDs7QUFFQSwwQkFBa0IsV0FBbEIsQ0FBOEIsTUFBOUI7O0FBRUEsZ0JBQ0csSUFESCxDQUNRLFlBQVc7QUFDZiw0QkFBa0IsV0FBbEIsQ0FBOEIsU0FBOUI7QUFDRCxTQUhILEVBSUcsS0FKSCxDQUlTLFlBQVc7QUFDaEIsNEJBQWtCLFdBQWxCLENBQThCLE9BQTlCO0FBQ0QsU0FOSCxFQU9HLE9BUEgsQ0FPVyxZQUFXOztBQUVsQixzQkFBWSxLQUFaO0FBQ0Esa0JBQVEsV0FBUixDQUFvQixZQUFwQjtBQUNELFNBWEg7QUFZRCxPQTlCRDtBQStCRDtBQXpGSSxHQUFQO0FBMkZEOzs7OztBQzdGRDs7QUFDQTs7QUFHQSxDQUFDLFlBQVk7QUFDWCxVQUFRLE1BQVIsQ0FBZSxtQkFBZixFQUFvQyxFQUFwQyxFQUNHLFNBREgsQ0FDYSxrQkFEYixtQ0FFRyxTQUZILENBRWEsc0JBRmI7QUFHRCxDQUpEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuZXhwb3J0IGZ1bmN0aW9uIG1ibVdhaXRpbmdCdXR0b25UZXh0KCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgIHJlcXVpcmU6ICdebWJtV2FpdGluZ0J1dHRvbicsXG4gICAgc2NvcGU6IHtcbiAgICAgIHN0YXR1c0NhdGVnb3J5OiAnQHdhaXRpbmdCdXR0b25UZXh0J1xuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgZWxlbWVudCwgYXR0ciwgd2FpdGluZ0J1dHRvbkN0cmwpIHtcbiAgICAgIHdhaXRpbmdCdXR0b25DdHJsLnJlZ2lzdGVyVGV4dChvbkNoYW5nZVN0YXR1cyk7XG5cbiAgICAgIHZhciBzdGF0ZXMgPSAkc2NvcGUuc3RhdHVzQ2F0ZWdvcnkuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oc3RhdGUpIHsgcmV0dXJuIHN0YXRlLnRyaW0oKTsgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9uQ2hhbmdlU3RhdHVzKG5ld1N0YXR1cykge1xuICAgICAgICBpZiAoc3RhdGVzLmluZGV4T2YobmV3U3RhdHVzKSA+PSAwKSB7XG4gICAgICAgICAgZWxlbWVudC5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25DaGFuZ2VTdGF0dXMod2FpdGluZ0J1dHRvbkN0cmwuZ2V0U3RhdGUoKSk7XG4gICAgfVxuICB9O1xufVxuIiwiXG5leHBvcnQgZnVuY3Rpb24gbWJtV2FpdGluZ0J1dHRvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICdtYm1XYWl0aW5nQnV0dG9uJyxcbiAgICBzY29wZToge1xuICAgICAgYWN0aW9uUmVjZWl2ZXI6ICcmbWJtV2FpdGluZ0J1dHRvbicsXG4gICAgICBpc0V4dGVybmFsRW5hYmxlZDogJz0/d2FpdGluZ0J1dHRvbkVuYWJsZWQnLFxuICAgICAgd2FpdGluZ0NsYXNzOiAnQD93YWl0aW5nQnV0dG9uV2FpdGluZ0NsYXNzJyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzLFxuICAgICAgICAgIHJlZ2lzdGVyZWRUZXh0cyA9IFtdLFxuICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9ICdpbml0JztcblxuICAgICAgdm0ucmVnaXN0ZXJUZXh0ID0gZnVuY3Rpb24gcmVnaXN0ZXJUZXh0KHdhaXRpbmdCdXR0b25UZXh0TGlzdGVuZXIpIHtcbiAgICAgICAgcmVnaXN0ZXJlZFRleHRzLnB1c2god2FpdGluZ0J1dHRvblRleHRMaXN0ZW5lcik7XG4gICAgICB9O1xuXG4gICAgICB2bS51cGRhdGVTdGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKG5ld1N0YXRlKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IG5ld1N0YXRlO1xuXG4gICAgICAgIG5vdGlmeVN0YXRlQ2hhbmdlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICB9O1xuXG4gICAgICB2bS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gbm90aWZ5U3RhdGVDaGFuZ2UobmV3U3RhdGUpIHtcbiAgICAgICAgcmVnaXN0ZXJlZFRleHRzLmZvckVhY2goZnVuY3Rpb24od2FpdGluZ0J1dHRvblRleHRMaXN0ZW5lcikge1xuICAgICAgICAgIHdhaXRpbmdCdXR0b25UZXh0TGlzdGVuZXIobmV3U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XSxcbiAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtZW50LCBhdHRyLCB3YWl0aW5nQnV0dG9uQ3RybCkge1xuICAgICAgdmFyIGlzV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICAvLyBTdGFydCB3aXRoIHRoZSBkZWZhdWx0IHdhaXRpbmcgY2xhc3NcbiAgICAgIHZhciB3YWl0aW5nQ2xhc3MgPSAnbWJtLXdhaXRpbmctYnV0dG9uLS13YWl0aW5nJztcblxuICAgICAgaWYgKHR5cGVvZiAkc2NvcGUud2FpdGluZ0NsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBpZiBhIGN1c3RvbSB3YWl0aW5nIGNsYXNzIGhhcyBiZWVuIHByb3ZpZGVkLlxuICAgICAgICB3YWl0aW5nQ2xhc3MgPSAkc2NvcGUud2FpdGluZ0NsYXNzO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mICRzY29wZS5pc0V4dGVybmFsRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gTm8gdmFsdWUgcHJvdmlkZWQgZm9yIGV4dGVybmFsIGJ1dHRvbiBlbmFibGVkIGF0dHJpYnV0ZTsgYXNzdW1lXG4gICAgICAgIC8vIGJ1dHRvbiBpcyBhbHdheXMgY29uc2lkZXJlZCBleHRlcm5hbGx5IGVuYWJsZWQuXG4gICAgICAgICRzY29wZS5pc0V4dGVybmFsRW5hYmxlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5pc0VuYWJsZWQgPSBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAkc2NvcGUuaXNFeHRlcm5hbEVuYWJsZWQgJiYgIWlzV2FpdGluZztcbiAgICAgIH1cblxuICAgICAgJHNjb3BlLiR3YXRjaCgnaXNFbmFibGVkKCknLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0aGUgYnV0dG9uIGlzbid0IGVuYWJsZWQuXG4gICAgICAgIGlmICghJHNjb3BlLmlzRW5hYmxlZCgpKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIGFjdGlvbiwgYW5kIGNhcHR1cmUgdGhlIChleHBlY3RlZCkgcmV0dXJuZWQgcHJvbWlzZS5cbiAgICAgICAgdmFyIGFjdGlvblEgPSAkc2NvcGUuYWN0aW9uUmVjZWl2ZXIoKTtcblxuICAgICAgICAvLyBBZGQgd2FpdGluZyBzdHlsZS5cbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcyh3YWl0aW5nQ2xhc3MpO1xuXG4gICAgICAgIC8vIFNldCB3YWl0aW5nIGZsYWcsIGFuZCBhcHBseSBzY29wZSB0byB1cGRhdGUgaXNFbmFibGVkIHdhdGNoLlxuICAgICAgICBpc1dhaXRpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgd2FpdGluZ0J1dHRvbkN0cmwudXBkYXRlU3RhdGUoJ3dhaXQnKTtcblxuICAgICAgICBhY3Rpb25RXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3YWl0aW5nQnV0dG9uQ3RybC51cGRhdGVTdGF0ZSgnc3VjY2VzcycpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2FpdGluZ0J1dHRvbkN0cmwudXBkYXRlU3RhdGUoJ2Vycm9yJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSB3YWl0aW5nIHN0eWxlIGFuZCBmbGFnLlxuICAgICAgICAgICAgaXNXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKHdhaXRpbmdDbGFzcyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7bWJtV2FpdGluZ0J1dHRvbn0gZnJvbSAnLi93YWl0aW5nLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHttYm1XYWl0aW5nQnV0dG9uVGV4dH0gZnJvbSAnLi93YWl0aW5nLWJ1dHRvbi10ZXh0LmRpcmVjdGl2ZSc7XG5cblxuKGZ1bmN0aW9uICgpIHtcbiAgYW5ndWxhci5tb2R1bGUoJ21ibS53YWl0aW5nQnV0dG9uJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnbWJtV2FpdGluZ0J1dHRvbicsIG1ibVdhaXRpbmdCdXR0b24pXG4gICAgLmRpcmVjdGl2ZSgnbWJtV2FpdGluZ0J1dHRvblRleHQnLCBtYm1XYWl0aW5nQnV0dG9uVGV4dCk7XG59KSgpO1xuIl19
