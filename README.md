# Angular Waiting Button

A flexible directive that manages changing button state to indicate that a Promise-based operation is still in-flight.


## Installation

Angular Waiting Button is available as a Bower package under the name `angular-waiting-button`:

```
bower install angular-waiting-button
```

Angular waiting button is tested against Angular 1.4 and above; earlier versions might also be compatible but haven't been tested.

Once the Bower component is installed, you'll need to include the script and style in your app:

```html
<link rel="stylesheet" href="bower_components/angular-waiting-button/dist/angular-waiting-button.css">

<script src="bower_components/angular-waiting-button/dist/angular-waiting-button.js"></script>
```


## Usage

Angular Waiting Button intercepts click (and touch) events directed to a button. When a click event is received, the waiting button directive will call the provided function and expects to receive a promise in return. Waiting button will put the button into a "waiting" state until that promise completes (either success or error will end the "waiting" state).

This example shows waiting button being used within a basic directive. Waiting button will show the pending animation until the Promise return by `$timeout` resolves.

```javascript
(function () {
  angular
    .module('app')
    .directive('test', () => {
      return {
        restrict: 'E',
        scope: { },
        bindToController: true,
        template: `
          <button mbm-waiting-button="ctrl$.onClickTest()">Pending Button Test</button>
        `,
        controllerAs: 'ctrl$',
        controller: ['$timeout', TestController]
      };
    });

  function TestController($timeout) {
    var vm = this;

    vm.onClickTest = function($event) {
      if ($event) { $event.preventDefault(); }

      return $timeout(() => {
        console.log(`$timeout result returning...`);
      }, 3000);
    }
  }
})();
```

By default, waiting button will apply an included style during the "waiting" state that causes the host element's opacity to animate. If you'd like to substitute your own waiting style, you can do so by providing the class in the attribute `waiting-button-waiting-class`:

```html
<button
  mbm-waiting-button="ctrl$.onClickTest()"
  waiting-button-waiting-class="my-custom-waiting-class">
    Pending Button Test
</button>
```


## Roadmap

Here are some upcoming features we're planning on implementing:

* Better support for disabling the host button
* Support for listening to form submission events
* More "stock" waiting animations


## Sponsors

The development of Angular Waiting Button is sponsored by [Made By Munsters](http://madebymunsters.com/).
