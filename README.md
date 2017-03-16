# Angular Waiting Button

A flexible directive that manages changing button state to indicate that a Promise-based operation is still in-flight.


## Installation

Angular Waiting Button is available as a NPM package under the name `angular-waiting-button`:

```
npm install --save angular-waiting-button
```

Angular waiting button is tested against Angular 1.4 and above; earlier versions might also be compatible but haven't been tested.

Once the NPM package is installed, you'll need to include the module in your app;

```javascript
import mbmWaitingButton from "angular-waiting-button";
angular.module("app", [mbmWaitingButton]);
```


## Usage

Angular Waiting Button intercepts click (and touch) events directed to a button. When a click event is received, the waiting button directive will call the provided function and expects to receive a promise in return. Waiting button will put the button into a "waiting" state until that promise completes (either success or error will end the "waiting" state).

This example shows waiting button being used within a basic directive. Waiting button will show the pending animation until the Promise return by `$timeout` resolves.

```javascript
import angular from 'angular';
import mbmWaitingButton from "angular-waiting-button";

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
```

By default, waiting button will apply an included style during the "waiting" state that causes the host element's opacity to animate. If you'd like to substitute your own waiting style, you can do so by providing the class in the attribute `waiting-button-waiting-class`:

```html
<button
  mbm-waiting-button="$ctrl.onClickTest()"
  waiting-button-waiting-class="my-custom-waiting-class">
    Pending Button Test
</button>
```

## Demo App Development

In order to work on development of the demo app you will need to cd into the demo-app directory and run the following:
- `npm install`
- `npm run server`
- browse to `http://127.0.0.1:8080/`


## Demo App Run

In order to run the demo app you will just need to open `demo-app/dist/index.html` in a browser.


## Roadmap

Here are some upcoming features we're planning on implementing:

* Better support for disabling the host button
* Support for listening to form submission events
* More "stock" waiting animations


## Sponsors

The development of Angular Waiting Button is sponsored by [Made By Munsters](http://madebymunsters.com/).
